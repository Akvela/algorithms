interface IStack<T> {
  push: (
    item: T,
    callback: React.Dispatch<React.SetStateAction<boolean | undefined>>
  ) => void;
  pop: () => void;
  clear: () => void;
  getSize: () => number;
  peak: () => T | null;
  getElements: () => T[];
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];
  private length = this.container.length;

  push = (item: T, callback: React.Dispatch<React.SetStateAction<boolean | undefined>>) => {
    this.container.push(item);
    callback(true);
  }

  pop = () => {this.container.pop()};
  
  clear = () => {this.container = []};

  getSize = () => this.container.length;

  peak = () => {
    if (this.container = []) {
      return null;
    } else {
      return this.container[this.length - 1];
    };
  };

  getElements = () => this.container;
};
