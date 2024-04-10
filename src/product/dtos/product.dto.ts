export class ProductDto {
  readonly id: number;
  readonly name: string;
  readonly price: number;
  readonly description: string;
  readonly images: File[];
  readonly stock: number;
  readonly sku: number;
  readonly variant: string;
  readonly category: string;
  readonly industry: string[];
}
