export class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T, next?: ListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  };
};

interface IList<T> {
  append: (item: T) => void;
  prepend: (item: T) => void;
  addIndex: (item: T, position: number) => void;
  getSize: () => number;
  deleteHead: () => void;
  deleteTail: () => void;
  putArray: () => ListNode<T>[];
  deleteIndex: (index: number) => void;
  print: () => void;
}

export class List<T> implements IList<T> {
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;
  size: number;
  values: T[];
  constructor(values?: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.values = values!;
  }

  deleteHead = () => {
    if (!this.head) {
      return;
    };
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    };
    this.size--;
  };

  deleteTail = () => {
    if (!this.tail) {
      return null;
    };
    const deletedTail = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedTail;
    };
    let currNode = this.head;
    while (currNode!.next) {
      if (!currNode!.next.next) {
        currNode!.next = null;
      } else {
        currNode = currNode!.next;
      };
    };
    this.tail = currNode;
    this.size--;
  };

  putArray = () => {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  addIndex = (item: T, index: number | string) => {
    if (index < 0 || index > this.size) {
      return;
    } else {
      const node = new ListNode(item);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        let prev = null;
        while (currIndex < index) {
          prev = curr;
          curr = curr!.next;
          currIndex++;
        };
        prev!.next = node;
        node.next = curr;
      };
      this.size++;
    };
  };

  deleteIndex = (index: number | string) => {
    if (index < 0 || index > this.size) {
      return;
    } else {
      if (index === 0) {
        this.head = this.head!.next;
      } else {
        let curr = this.head;
        let currIndex = 0;
        let prev = null;
        while (currIndex < index) {
          prev = curr;
          curr = curr!.next;
          currIndex++;
        };
        prev!.next = curr!.next;
        if (curr === this.tail) {
          this.tail = null;
        }
        curr = null;
      }
      this.size--;
    };
  };

  append = (item: T) => {
    const node = new ListNode(item);
    let curr;
    if (this.head === null) {
      this.head = node;
    } else {
      curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = node;
    }
    this.size++;
    this.tail = node;
  };

  prepend = (item: T) => {
    const newNode = new ListNode(item, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    };
    this.size++;
  };

  getSize = () => {return this.size}

  print = () => {
    let curr = this.head;
    let res = '';
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
  }
}