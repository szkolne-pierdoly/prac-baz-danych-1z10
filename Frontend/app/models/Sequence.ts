import SequenceQuestion from "./SequenceQuestion";

export interface Sequence {
  id: number;
  name: string;
  part1Questions: SequenceQuestion[];
  part2Questions: SequenceQuestion[];
  part3Questions: SequenceQuestion[];
}
