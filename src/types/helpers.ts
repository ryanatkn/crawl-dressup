/*
`is` is useful for assertions, like in switch case default blocks, eg:
    switch (foo) {
      cases...
      default: is<never>(foo); // compile-time exhaustivity checking! if only there was pattern matching.
    }
*/
export const is = <T>(a: T): T => a;
