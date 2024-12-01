import gleam/dict
import solutions/y2023/d1/solution as y2023d1
import solutions/y2024/d1/solution as y2024d1

pub fn all_solutions() {
  dict.from_list([#("2023d1", y2023d1.sol), #("2024d1", y2024d1.sol)])
}
