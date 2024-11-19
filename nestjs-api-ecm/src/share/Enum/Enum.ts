export enum UserRole {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
}

export enum ExpirationStatus {
  All = 'Tất cả',
  Valid = 'Còn hạn',
  Expired = 'Hết hạn',
  ExpiringSoon = 'Sắp hết hạn',
}

export enum ApplyStatus {
  All = 'Tất cả',
  True = 'Áp dụng',
  False = 'Không áp dụng',
}

export enum PaymentStatus {
  Paid = 'Đã thanh toán',
  Unpaid = 'Chưa thanh toán',
  Debt = 'Nợ',
}

export enum OrderStatus {
  Checking = 'Đang kiểm hàng',
  InTransit = 'Đang vận chuyển',
  Delivered = 'Đã giao hàng',
  Canceled = 'Hủy đơn hàng',
}

export enum PaymentMethod {
  CashOnDelivery = 'Thanh toán khi nhận hàng',
  BankTransfer = 'Chuyển khoản ngân hàng',
}
