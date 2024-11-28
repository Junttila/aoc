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
            Ok(y) -> io.println(y)
            _ -> io.println("no solution found")
          }
        _ -> io.println("no solution found")
      }
    }
    _ -> io.println("Usage: vars get <name>")
  }
  0
}
