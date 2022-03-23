
import { Service } from "../framework/@decorators/Service";

@Service()
export default class TestService {

  test() {
    return "test"
  }
}
