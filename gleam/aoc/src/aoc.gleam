import argv
import gleam/dict
import gleam/io
import solutions/index.{all_solutions}

pub fn main() {
  case argv.load().arguments {
    [year, day] -> {
      let solutions = all_solutions()
      let selected = dict.get(solutions, year <> "d" <> day)
      case selected {
        Ok(x) ->
          case x() {
            [sol1, sol2] ->
              io.println(
                "Solution part 1: " <> sol1 <> "\nSolution part 2: " <> sol2,
              )
            _ -> io.println("no solution found")
          }
        _ -> io.println("no solution found")
      }
    }
    _ -> io.println("Usage: aoc <year> <day>")
  }
  0
}
