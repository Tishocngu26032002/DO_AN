export class ObjectExtension{

    //Chỉ sử dụng cho check string
    public static isNullOrEmpty(input: any): boolean {
        return input == null || input.toString().trim().length === 0;
    }

    //Chỉ sử dụng cho check string
    public static isNotNullOrEmpty(input: any): boolean {
        return !ObjectExtension.isNullOrEmpty(input);
    }

    //Tạo GuID duy nhất
    public static generateGuid(): string {
        return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
            const r = Math.random() * 16 | 0;
            return r.toString(16);
        });
    }
}