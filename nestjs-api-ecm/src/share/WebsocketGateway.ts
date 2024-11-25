import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';



interface AdminData {
    id: string;
    name: string;
    email: string;
}

@Injectable()
@WebSocketGateway({
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"],
        credentials: true,
    },
})
export class WebsocketGateway {
    private connectedAdmins = new Map<AdminData, Socket>();

    // Lắng nghe sự kiện 'admin_connected' từ frontend
    @SubscribeMessage('admin_connected')
    handleAdminConnect(@MessageBody() adminSend: AdminData, @ConnectedSocket() socket: Socket): void {
        // Lưu kết nối của admin vào Map
        this.connectedAdmins.set(adminSend, socket);
        console.log(`Admin ${adminSend} đã kết nối.`);
    }

    // Lắng nghe sự kiện ngắt kết nối
    handleDisconnect(@ConnectedSocket() socket: Socket): void {
        const adminId = [...this.connectedAdmins.entries()].find(([_, s]) => s === socket)?.[0];
        if (adminId) {
            this.connectedAdmins.delete(adminId);
            console.log(`Admin ${adminId} đã ngắt kết nối.`);
        }
    }

    // Kiểm tra xem có bao nhiêu admin đang online
    adminOnlines(emails: string[]): string[] {
        const onlineAdmins: string[] = [];
        for (const [admin, socket] of this.connectedAdmins) {
            if (emails.includes(admin.email)) {
                onlineAdmins.push(admin.email);
            }
        }
        return onlineAdmins;
    }

    // Gửi thông báo đến admin khi có thông báo mới
    notifyAdmin(adminEmails: string[], notification: any): void {
        for (const [admin, socket] of this.connectedAdmins) {
            if (adminEmails.includes(admin.email)) {
                socket.emit('newOrder', notification);
                console.log(`Notification sent to ${admin.email}`);
            }
        }
    }

}
