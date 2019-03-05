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
// of the imported and local functions.  |test| is exported.  It uses the
// supplied |insn| to modify the table somehow.  |check| will then indirect-call
// the table entry number specified as a parameter.  That will either return a
// value 0 to 9 indicating the function called, or will throw an exception if
// the table entry is empty.

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
  (elem passive funcref 2 7 1 8)
  (elem (i32.const 12) 7 5 2 3 6)
  (elem passive funcref 5 9 2 7 6)
  (func (result i32) (i32.const 5))  ;; index 5
  (func (result i32) (i32.const 6))
  (func (result i32) (i32.const 7))
  (func (result i32) (i32.const 8))
  (func (result i32) (i32.const 9))  ;; index 9
  (func (export "test")
    ${insn})
  (func (export "check") (param i32) (result i32)
    (call_indirect (type 0) (local.get 0)))
)
`);
}

// This is the test driver.  It constructs the abovementioned module, using the
// given |instruction| to modify the table, and then probes the table by making
// indirect calls, one for each element of |expected_result_vector|.  The
// results are compared to those in the vector.

function tab_test(instruction, expected_result_vector) {
    emit_b(instruction);
    print(`(invoke "test")`);
    for (let i = 0; i < expected_result_vector.length; i++) {
        let expected = expected_result_vector[i];
        if (expected === undefined) {
            print(`(assert_trap (invoke "check" (i32.const ${i})) "uninitialized element")`);
        } else {
            print(`(assert_return (invoke "check" (i32.const ${i})) (i32.const ${expected}))`);
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
  "unknown table 0")
`);

// table.init requires a table, minimally
print(
`(assert_invalid
  (module
    (func (export "test")
      (table.init 0 (i32.const 12) (i32.const 1) (i32.const 1))))
  "unknown table 0")
`);

// elem.drop with elem seg ix out of range
print(
`(assert_invalid
  (module
    (elem passive funcref 0)
    (func (result i32) (i32.const 0))
    (func (export "test")
      (elem.drop 4)))
  "unknown table 0")
`);

// init with elem seg ix out of range
print(
`(assert_invalid
  (module
    (elem passive funcref 0)
    (func (result i32) (i32.const 0))
    (func (export "test")
      (table.init 4 (i32.const 12) (i32.const 1) (i32.const 1))))
  "unknown table 0")
`);

function do_test(insn1, insn2, errText)
{
    print(`
(module
  (table 30 30 funcref)
  (elem (i32.const 2) 3 1 4 1)
  (elem passive funcref 2 7 1 8)
  (elem (i32.const 12) 7 5 2 3 6)
  (elem passive funcref 5 9 2 7 6)
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

// drop with elem seg ix indicating an active segment
tab_test2("elem.drop 2", "",
          "elements segment dropped");

// init with elem seg ix indicating an active segment
tab_test2("(table.init 2 (i32.const 12) (i32.const 1) (i32.const 1))", "",
         "elements segment dropped");

// init, using an elem seg ix more than once is OK
tab_test_nofail(
    "(table.init 1 (i32.const 12) (i32.const 1) (i32.const 1))",
    "(table.init 1 (i32.const 21) (i32.const 1) (i32.const 1))");

// drop, then drop
tab_test2("elem.drop 1",
          "elem.drop 1",
          "elements segment dropped");

// drop, then init
tab_test2("elem.drop 1",
         "(table.init 1 (i32.const 12) (i32.const 1) (i32.const 1))",
         "elements segment dropped");

// init: seg ix is valid passive, but length to copy > len of seg
tab_test2("",
         "(table.init 1 (i32.const 12) (i32.const 0) (i32.const 5))",
         "out of bounds");

// init: seg ix is valid passive, but implies copying beyond end of seg
tab_test2("",
         "(table.init 1 (i32.const 12) (i32.const 2) (i32.const 3))",
         "out of bounds");

// init: seg ix is valid passive, but implies copying beyond end of dst
tab_test2("",
         "(table.init 1 (i32.const 28) (i32.const 1) (i32.const 3))",
         "out of bounds");

// init: seg ix is valid passive, zero len, and src offset out of bounds at the
// end of the table - this is allowed
tab_test2("",
         "(table.init 1 (i32.const 12) (i32.const 4) (i32.const 0))",
         undefined);

// init: seg ix is valid passive, zero len, and dst offset out of bounds at the
// end of the table - this is allowed
tab_test2("",
         "(table.init 1 (i32.const 30) (i32.const 2) (i32.const 0))",
         undefined);

// invalid argument types
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
     (table 10 funcref)
     (elem passive funcref $f0 $f0 $f0)
     (func $f0)
     (func (export "test")
       (table.init 0 (${ty1}.const 1) (${ty2}.const 1) (${ty3}.const 1))))
   "type mismatch")
`);
    }}}
}

// table.init: out of bounds of the table or the element segment, but should
// perform the operation up to the appropriate bound.
//
// Arithmetic overflow of tableoffset + len or of segmentoffset + len should not
// affect the behavior.

// Note, the length of the element segment is 16.
const tbl_init_len = 16;

function tbl_init(min, max, backup, write, segoffs=0) {
    print(
        `(module
           (type (func (result i32)))
           (table ${min} ${max} funcref)
           (elem passive funcref $f0 $f1 $f2 $f3 $f4 $f5 $f6 $f7 $f8 $f9 $f10 $f11 $f12 $f13 $f14 $f15)
           (func $f0 (export "f0") (result i32) (i32.const 0))
           (func $f1 (export "f1") (result i32) (i32.const 1))
           (func $f2 (export "f2") (result i32) (i32.const 2))
           (func $f3 (export "f3") (result i32) (i32.const 3))
           (func $f4 (export "f4") (result i32) (i32.const 4))
           (func $f5 (export "f5") (result i32) (i32.const 5))
           (func $f6 (export "f6") (result i32) (i32.const 6))
           (func $f7 (export "f7") (result i32) (i32.const 7))
           (func $f8 (export "f8") (result i32) (i32.const 8))
           (func $f9 (export "f9") (result i32) (i32.const 9))
           (func $f10 (export "f10") (result i32) (i32.const 10))
           (func $f11 (export "f11") (result i32) (i32.const 11))
           (func $f12 (export "f12") (result i32) (i32.const 12))
           (func $f13 (export "f13") (result i32) (i32.const 13))
           (func $f14 (export "f14") (result i32) (i32.const 14))
           (func $f15 (export "f15") (result i32) (i32.const 15))
           (func (export "test") (param $n i32) (result i32)
             (call_indirect (type 0) (local.get $n)))
           (func (export "run") (param $offs i32) (param $len i32)
             (table.init 0 (local.get $offs) (i32.const ${segoffs}) (local.get $len))))`);
    // A fill writing past the end of the table should throw *and* have filled
    // all the way up to the end.
    //
    // A fill reading past the end of the segment should throw *and* have filled
    // table with as much data as was available.
    let offs = min - backup;
    print(`(assert_trap (invoke "run" (i32.const ${offs}) (i32.const ${write})) "out of bounds")`);
    for (let i=0; i < Math.min(backup, tbl_init_len - segoffs); i++) {
        print(`(assert_return (invoke "test" (i32.const ${offs + i})) (i32.const ${i + segoffs}))`);
    }
    for (let i=Math.min(backup, tbl_init_len); i < backup; i++) {
        print(`(assert_trap (invoke "test" (i32.const ${offs + i})) "uninitialized element")`);
    }
    for (let i=0; i < offs; i++) {
        print(`(assert_trap (invoke "test" (i32.const ${i})) "uninitialized element")`);
    }
}

// We exceed the bounds of the table but not of the element segment
tbl_init(tbl_init_len*2, tbl_init_len*4, Math.floor(tbl_init_len/2), tbl_init_len);
tbl_init(tbl_init_len*2, tbl_init_len*4, Math.floor(tbl_init_len/2)-1, tbl_init_len);

// We exceed the bounds of the element segment but not the table
tbl_init(tbl_init_len*10, tbl_init_len*20, tbl_init_len*4, tbl_init_len*2);
tbl_init(tbl_init_len*10, tbl_init_len*20, tbl_init_len*4-1, tbl_init_len*2-1);

// We arithmetically overflow the table limit but not the segment limit
tbl_init(tbl_init_len*4, tbl_init_len*4, tbl_init_len, 0xFFFFFFF0);

// We arithmetically overflow the segment limit but not the table limit
tbl_init(tbl_init_len, tbl_init_len, tbl_init_len, 0xFFFFFFFC, Math.floor(tbl_init_len/2));

