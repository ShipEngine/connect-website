export default interface TestProp<T> {
  title: string;
  props: T;
  skip?: boolean;
  shouldPass?: boolean;
}
