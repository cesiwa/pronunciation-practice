import librosa
import numpy as np

def calculate_mfcc(file_path):
    # Ses dosyasını yükle
    y, sr = librosa.load(file_path, sr=None)
    # MFCC özelliklerini hesapla
    mfcc_features = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    return np.mean(mfcc_features.T, axis=0)

def compare_audio(file1, file2):
    # İki ses dosyası için MFCC hesapla
    mfcc1 = calculate_mfcc(file1)
    mfcc2 = calculate_mfcc(file2)
    
    # Kosinüs benzerliği hesapla
    similarity = np.dot(mfcc1, mfcc2) / (np.linalg.norm(mfcc1) * np.linalg.norm(mfcc2))
    return similarity * 100  # Benzerliği yüzde olarak döndür

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 3:
        print("Usage: python compare_audio.py <file1> <file2>")
        sys.exit(1)
    
    file1 = sys.argv[1]
    file2 = sys.argv[2]
    
    similarity = compare_audio(file1, file2)
    print(f"Ses benzerlik oranı: {similarity:.2f}%")
