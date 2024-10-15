import { TimeoutError } from 'rxjs';

export class CustomTimeoutError extends TimeoutError {
  url?: string;
}
