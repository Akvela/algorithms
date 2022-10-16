interface IQueue<T> {
  enqueue: (
    item: T,
    callback: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  ) => void;
  dequeue: () => void;
  getHead: () => T | null;
  getTail: () => T | null;
  clear: () => void;
  fullness: () => boolean;
  elements: () => Array<T | null>;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private length = this.container.length;
  private head = 0;
  private tail = 0;
  private size: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  };

  enqueue = (item: T, callback: React.Dispatch<React.SetStateAction<boolean | undefined>>) => {
    if (this.length >= this.size - 1) {
      callback(true);
    };
    if (this.tail === this.size) {
      this.tail = 0;
    };
    this.container[this.tail] = item;
    this.length++;
    this.tail++;
  };

  dequeue = () => {
    if (this.head === this.size) {
      this.head = 0;
    };
    this.container[this.head % this.size] = null;
    this.length--;
    this.head++;
  };

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = Array(this.size);
  };

  getHead = () => {return this.container[this.head]};

  getTail = () => {return this.container[this.tail - 1]};

  fullness = () => this.length === 0;

  getLength = () => {return this.tail};

  getIndexHead = () => {return this.head};

  elements = () => {return this.container};
};
