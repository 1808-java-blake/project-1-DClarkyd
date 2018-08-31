export class Reimbursement {
  id = 0
  amount = 0
  resolved = ''
  description = ''
  author = ''
  resolver = ''
  statusId = 0
  typeId = 0

  constructor(id?: number, amount?: number, resolved?: string, description?: string, author?: string, resolver?: string, statusId?: number, typeId?: number) {
    id && (this.id = id);
    amount && (this.amount = amount);
    resolved && (this.resolved = resolved);
    description && (this.description = description);
    author && (this.author = author)
    resolver &&(this.resolver = resolver)
    statusId && (this.statusId = statusId)
    typeId && (this.typeId = typeId)
  }
}