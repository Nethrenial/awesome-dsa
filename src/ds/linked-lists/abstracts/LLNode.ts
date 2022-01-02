export interface LLNode<T = number> {
  value: T;
  next: LLNode<T> | null;
  prev?: LLNode<T> | null;
}
