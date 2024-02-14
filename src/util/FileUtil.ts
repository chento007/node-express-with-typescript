export class FileUtil {

    static getExtension(filename: string): string {
        return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
    }
}