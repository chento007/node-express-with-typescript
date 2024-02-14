import { File } from "app/@types/file";
import { FileUtil } from "../../util/FileUtil";
export class FileService {

    static uploadImage(file: Express.Multer.File): File {

        return {
            name: file.filename,
            size: file.size,
            extension: FileUtil.getExtension(file.originalname),
            type: "image",
        }
    }
}