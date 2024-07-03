import sys
import os
import numpy as np
from keras_facenet import FaceNet

def get_embedding(embedder, image_path):
    try:
        return embedder.extract(image_path, threshold=0.85)
    except:
        return None

def load_embeddings(embedder, directory):
    embeddings = []
    names = []
    for person_name in os.listdir(directory):
        person_path = os.path.join(directory, person_name)
        if os.path.isdir(person_path):
            for image_name in os.listdir(person_path):
                image_path = os.path.join(person_path, image_name)
                embedding = get_embedding(embedder, image_path)
                if embedding is not None:
                    embeddings.append(embedding)
                    names.append(person_name)
    return np.array(embeddings), names

def find_closest(embedder, embedding, embeddings, names):
    min_dist = float('inf')
    min_name = "undefind"
    for i, e in enumerate(embeddings):
        dist = embedder.compute_distance(embedding['embedding'], e[0]['embedding'])
        if dist < min_dist and  dist < 1:
            min_dist = dist
            min_name = names[i]
    return min_name

def find_persons(embedder, image_path, embeddings, names):
    image_embeddings = get_embedding(embedder, image_path)
    if image_embeddings is None:
        return "undefined"

    detected_names = []
    for image_embedding in image_embeddings:
        detected_names.append(find_closest( embedder, image_embedding, embeddings, names))

    return ', '.join(detected_names)

def main(image_path):
    embedder = FaceNet()
    embeddings, names = load_embeddings(embedder, 'public/photos')
    detected_names = find_persons(embedder, image_path, embeddings, names)
    print(detected_names)

if __name__ == "__main__":
    image_path = sys.argv[1]
    main(image_path)
