// This program generates .wast code that contains all the spec tests for
// memory.init.  See `Makefile`.

print_origin("generate_memory_init.js");

// In-bounds tests.

function mem_test(instruction, expected_result_vector) {
    print(
`
(module
  (memory (export "memory0") 1 1)
  (data (i32.const 2) "\\03\\01\\04\\01")
  (data passive "\\02\\07\\01\\08")
  (data (i32.const 12) "\\07\\05\\02\\03\\06")
  (data passive "\\05\\09\\02\\07\\06")
  (func (export "test")
    ${instruction})
  (func (export "load8_u") (param i32) (result i32)
    (i32.load8_u (local.get 0))))

(invoke "test")
`);
    for (let i = 0; i < expected_result_vector.length; i++) {
        print(`(assert_return (invoke "load8_u" (i32.const ${i})) (i32.const ${expected_result_vector[i]}))`);
    }
}

const e = 0;

// This just gives the initial state of the memory, with its active
// initialisers applied.
mem_test("nop",
         [e,e,3,1,4, 1,e,e,e,e, e,e,7,5,2, 3,6,e,e,e, e,e,e,e,e, e,e,e,e,e]);

// Passive init that overwrites all-zero entries
mem_test("(memory.init 1 (i32.const 7) (i32.const 0) (i32.const 4))",
         [e,e,3,1,4, 1,e,2,7,1, 8,e,7,5,2, 3,6,e,e,e, e,e,e,e,e, e,e,e,e,e]);

// Passive init that overwrites existing active-init-created entries
mem_test("(memory.init 3 (i32.const 15) (i32.const 1) (i32.const 3))",
         [e,e,3,1,4, 1,e,e,e,e, e,e,7,5,2, 9,2,7,e,e, e,e,e,e,e, e,e,e,e,e]);

// Perform active and passive initialisation and then multiple copies
mem_test("(memory.init 1 (i32.const 7) (i32.const 0) (i32.const 4)) \n" +
         "data.drop 1 \n" +
         "(memory.init 3 (i32.const 15) (i32.const 1) (i32.const 3)) \n" +
         "data.drop 3 \n" +
         "(memory.copy (i32.const 20) (i32.const 15) (i32.const 5)) \n" +
         "(memory.copy (i32.const 21) (i32.const 29) (i32.const 1)) \n" +
         "(memory.copy (i32.const 24) (i32.const 10) (i32.const 1)) \n" +
         "(memory.copy (i32.const 13) (i32.const 11) (i32.const 4)) \n" +
         "(memory.copy (i32.const 19) (i32.const 20) (i32.const 5))",
         [e,e,3,1,4, 1,e,2,7,1, 8,e,7,e,7, 5,2,7,e,9, e,7,e,8,8, e,e,e,e,e]);

// Miscellaneous

// init with no memory
print(
`(assert_invalid
  (module
    (func (export "test")
      (memory.init 1 (i32.const 1234) (i32.const 1) (i32.const 1))))
  "can't touch memory without memory")
`);

let PREAMBLE =
    `(memory 1)
     (data passive "\\37")`;

// init with data seg ix out of range
print(
`(assert_invalid
  (module
    ${PREAMBLE}
    (func (export "test")
      (memory.init 1 (i32.const 1234) (i32.const 1) (i32.const 1))))
  "memory.init segment index out of range")
`);

// drop with data seg ix indicating an active segment
print(
`(assert_invalid
  (module
    (memory 1)
    (data (i32.const 0) "\\37")
    (func (export "test")
      (memory.init 0 (i32.const 1234) (i32.const 1) (i32.const 1))))
  "use of dropped data segment")
`);

// init, using a data seg ix more than once is OK
print(
`(module
  ${PREAMBLE}
  (func (export "test")
    (memory.init 0 (i32.const 1) (i32.const 0) (i32.const 1))
    (memory.init 0 (i32.const 1) (i32.const 0) (i32.const 1))))
(invoke "test")
`);

// drop, then init
print(
`(module
  ${PREAMBLE}
  (func (export "test")
    (data.drop 0)
    (memory.init 0 (i32.const 1234) (i32.const 1) (i32.const 1))))
(assert_trap (invoke "test") "use of dropped data segment")
`);

// init: seg ix is valid passive, but length to copy > len of seg
print(
`(module
  ${PREAMBLE}
  (func (export "test")
    (memory.init 0 (i32.const 1234) (i32.const 0) (i32.const 5))))
(assert_trap (invoke "test") "out of bounds")
`);

// init: seg ix is valid passive, but implies copying beyond end of seg
print(
`(module
  ${PREAMBLE}
  (func (export "test")
    (memory.init 0 (i32.const 1234) (i32.const 2) (i32.const 3))))
(assert_trap (invoke "test") "out of bounds")
`);

// init: seg ix is valid passive, but implies copying beyond end of dst
print(
`(module
  ${PREAMBLE}
  (func (export "test")
    (memory.init 0 (i32.const 0xFFFE) (i32.const 1) (i32.const 3))))
(assert_trap (invoke "test") "out of bounds")
`);

// init: seg ix is valid passive, zero len, but src offset out of bounds
print(
`(module
  ${PREAMBLE}
  (func (export "test")
    (memory.init 0 (i32.const 1234) (i32.const 4) (i32.const 0))))
(assert_trap (invoke "test") "out of bounds")
`);

// init: seg ix is valid passive, zero len, but dst offset out of bounds
print(
`(module
  ${PREAMBLE}
  (func (export "test")
    (memory.init 0 (i32.const 0x10000) (i32.const 2) (i32.const 0))))
(assert_trap (invoke "test") "out of bounds")
`);

// invalid argument types.  TODO: can add anyfunc etc here.
{
    const tys  = ['i32', 'f32', 'i64', 'f64'];

    for (let ty1 of tys) {
    for (let ty2 of tys) {
    for (let ty3 of tys) {
        if (ty1 == 'i32' && ty2 == 'i32' && ty3 == 'i32')
            continue;  // this is the only valid case
        print(
`(assert_invalid
   (module
     ${PREAMBLE}
     (func (export "test")
       (memory.init 0 (${ty1}.const 1) (${ty2}.const 1) (${ty3}.const 1))))
   "type mismatch")
`);
    }}}
}
