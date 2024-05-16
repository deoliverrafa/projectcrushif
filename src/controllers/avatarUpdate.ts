// imageValidation.ts

export function isValidImage(file: File): boolean {
    if (!file) return false;
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"]; // Tipos de imagens permitidos
    return allowedTypes.includes(file.type);
}