// This program generates .wast code that contains all the spec tests for
// table.init and elem.drop.  See `Makefile`.

print_origin("generate_table_init.js");

// This module "a" exports 5 functions ...

function emit_a() {
    print(
`
(module
  (func (export "ef0") (result i32) (i32.const 0))
  (func (export "ef1") (result i32) (i32.const 1))
  (func (export "ef2") (result i32) (i32.const 2))
  (func (export "ef3") (result i32) (i32.const 3))
  (func (export "ef4") (result i32) (i32.const 4))
)
(register "a")
`);
}

// ... and this one imports those 5 functions.  It adds 5 of its own, creates a
// 30 element table using both active and passive initialisers, with a mixture
// of the imported and local functions.  |testfn| is exported.  It uses the
// supplied |insn| to modify the table somehow, and then will indirect-call the
// table entry number specified as a parameter.  That will either return a value
// 0 to 9 indicating the function called, or will throw an exception if the
// table entry is empty.

function emit_b(insn) {
    print(
`
(module
  (type (func (result i32)))  ;; type #0
  (import "a" "ef0" (func (result i32)))    ;; index 0
  (import "a" "ef1" (func (result i32)))
  (import "a" "ef2" (func (result i32)))
  (import "a" "ef3" (func (result i32)))
  (import "a" "ef4" (func (result i32)))    ;; index 4
  (table 30 30 funcref)
  (elem (i32.const 2) 3 1 4 1)
  (elem passive 2 7 1 8)
  (elem (i32.const 12) 7 5 2 3 6)
  (elem passive 5 9 2 7 6)
  (func (result i32) (i32.const 5))  ;; index 5
  (func (result i32) (i32.const 6))
  (func (result i32) (i32.const 7))
  (func (result i32) (i32.const 8))
  (func (result i32) (i32.const 9))  ;; index 9
  (func (export "testfn") (param i32) (result i32)
    ${insn}
    (call_indirect (type 0) (local.get 0))
))
`);
}

// This is the test driver.  It constructs the abovementioned module, using the
// given |instruction| to modify the table, and then probes the table by making
// indirect calls, one for each element of |expected_result_vector|.  The
// results are compared to those in the vector.

var indirect_call_to_null = "uninitialized element"; // Reference interpreter
// var indirect_call_to_null = "indirect call to null"; // SpiderMonkey shell / Firefox

function tab_test(instruction, expected_result_vector) {
    emit_b(instruction);

    for (let i = 0; i < expected_result_vector.length; i++) {
        let expected = expected_result_vector[i];
        if (expected === undefined) {
            print(`(assert_trap (invoke "testfn" (i32.const ${i})) "${indirect_call_to_null}")`);
        } else {
            print(`(assert_return (invoke "testfn" (i32.const ${i})) (i32.const ${expected}))`);
        }
    }
}

emit_a();

// Using 'e' for empty (undefined) spaces in the table, to make it easier
// to count through the vector entries when debugging.
let e = undefined;

// Passive init that overwrites all-null entries
tab_test("(table.init 1 (i32.const 7) (i32.const 0) (i32.const 4))",
         [e,e,3,1,4, 1,e,2,7,1, 8,e,7,5,2, 3,6,e,e,e, e,e,e,e,e, e,e,e,e,e]);

// Passive init that overwrites existing active-init-created entries
tab_test("(table.init 3 (i32.const 15) (i32.const 1) (i32.const 3))",
         [e,e,3,1,4, 1,e,e,e,e, e,e,7,5,2, 9,2,7,e,e, e,e,e,e,e, e,e,e,e,e]);

// Perform active and passive initialisation and then multiple copies
tab_test("(table.init 1 (i32.const 7) (i32.const 0) (i32.const 4)) \n" +
         "elem.drop 1 \n" +
         "(table.init 3 (i32.const 15) (i32.const 1) (i32.const 3)) \n" +
         "elem.drop 3 \n" +
         "(table.copy (i32.const 20) (i32.const 15) (i32.const 5)) \n" +
         "(table.copy (i32.const 21) (i32.const 29) (i32.const 1)) \n" +
         "(table.copy (i32.const 24) (i32.const 10) (i32.const 1)) \n" +
         "(table.copy (i32.const 13) (i32.const 11) (i32.const 4)) \n" +
         "(table.copy (i32.const 19) (i32.const 20) (i32.const 5))",
         [e,e,3,1,4, 1,e,2,7,1, 8,e,7,e,7, 5,2,7,e,9, e,7,e,8,8, e,e,e,e,e]);


// elem.drop requires a table, minimally
print(
`(assert_invalid
  (module
    (func (export "test")
      (elem.drop 0)))
  "can't elem.drop without a table")
`);

// table.init requires a table, minimally
print(
`(assert_invalid
  (module
    (func (export "test")
      (table.init 0 (i32.const 12) (i32.const 1) (i32.const 1))))
  "table index out of range")
`);

function do_test(insn1, insn2, errText)
{
    print(`
(module
  (table 30 30 funcref)
  (elem (i32.const 2) 3 1 4 1)
  (elem passive 2 7 1 8)
  (elem (i32.const 12) 7 5 2 3 6)
  (elem passive 5 9 2 7 6)
  (func (result i32) (i32.const 0))
  (func (result i32) (i32.const 1))
  (func (result i32) (i32.const 2))
  (func (result i32) (i32.const 3))
  (func (result i32) (i32.const 4))
  (func (result i32) (i32.const 5))
  (func (result i32) (i32.const 6))
  (func (result i32) (i32.const 7))
  (func (result i32) (i32.const 8))
  (func (result i32) (i32.const 9))
  (func (export "test")
    ${insn1}
    ${insn2}))
`);

    if (errText !== undefined) {
        print(`(assert_trap (invoke "test") "${errText}")`);
    } else {
        print(`(invoke "test")`);
    }
}

function tab_test2(insn1, insn2, errText) {
    do_test(insn1, insn2, errText);
}

function tab_test_nofail(insn1, insn2) {
    do_test(insn1, insn2, undefined);
}

//
//---- table.{drop,init} --------------------------------------------------

// drop with elem seg ix out of range
tab_test2("elem.drop 4", "",
          "element segment index out of range for elem.drop");

// init with elem seg ix out of range
tab_test2("(table.init 4 (i32.const 12) (i32.const 1) (i32.const 1))", "",
          "table.init segment index out of range");

// drop with elem seg ix indicating an active segment
tab_test2("elem.drop 2", "",
          "use of dropped element segment");

// init with elem seg ix indicating an active segment
tab_test2("(table.init 2 (i32.const 12) (i32.const 1) (i32.const 1))", "",
         "use of dropped element segment");

// init, using an elem seg ix more than once is OK
tab_test_nofail(
    "(table.init 1 (i32.const 12) (i32.const 1) (i32.const 1))",
    "(table.init 1 (i32.const 21) (i32.const 1) (i32.const 1))");

// drop, then drop
tab_test2("elem.drop 1",
          "elem.drop 1",
          "use of dropped element segment");

// drop, then init
tab_test2("elem.drop 1",
         "(table.init 1 (i32.const 12) (i32.const 1) (i32.const 1))",
         "use of dropped element segment");

// init: seg ix is valid passive, but length to copy > len of seg
tab_test2("",
         "(table.init 1 (i32.const 12) (i32.const 0) (i32.const 5))",
         "index out of bounds");

// init: seg ix is valid passive, but implies copying beyond end of seg
tab_test2("",
         "(table.init 1 (i32.const 12) (i32.const 2) (i32.const 3))",
         "index out of bounds");

// init: seg ix is valid passive, but implies copying beyond end of dst
tab_test2("",
         "(table.init 1 (i32.const 28) (i32.const 1) (i32.const 3))",
         "index out of bounds");

// init: seg ix is valid passive, zero len, but src offset out of bounds
tab_test2("",
         "(table.init 1 (i32.const 12) (i32.const 4) (i32.const 0))",
         "index out of bounds");

// init: seg ix is valid passive, zero len, but dst offset out of bounds
tab_test2("",
         "(table.init 1 (i32.const 30) (i32.const 2) (i32.const 0))",
         "index out of bounds");

// invalid argument types
{
    const tys  = ['i32', 'f32', 'i64', 'f64'];

    for (let ty1 of tys) {
    for (let ty2 of tys) {
    for (let ty3 of tys) {
        if (ty1 == 'i32' && ty2 == 'i32' && ty3 == 'i32')
            continue;  // this is the only valid case
        let i1 = `(table.init 1 (${ty1}.const 1) (${ty2}.const 1) (${ty3}.const 1))`;
        tab_test2(i1, "", "type mismatch");
    }}}
}
