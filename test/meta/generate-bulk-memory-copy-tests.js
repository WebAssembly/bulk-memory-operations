// This program generates .wast code that contains all the spec tests for
// memory.copy.  See `Makefile`.

// WITH_SHARED_MEMORY can be overridden in a preamble, see `Makefile`.

// Set WITH_SHARED_MEMORY to true to get additional testing on memory backed by
// SharedArrayBuffer.
if (typeof this.WITH_SHARED_MEMORY == "undefined") {
    this.WITH_SHARED_MEMORY = false;
}

const PAGESIZE = 65536;

print(";;");
print(";; Generated by ../meta/generate-bulk-memory-copy-tests.js");
print(";;");

// In-bounds tests.

function gen_mem_mod_t(insn) {
    print(
`
(module
  (memory (export "memory0") 1 1)
  (data (i32.const 2) "\\03\\01\\04\\01")
  (data passive "\\02\\07\\01\\08")
  (data (i32.const 12) "\\07\\05\\02\\03\\06")
  (data passive "\\05\\09\\02\\07\\06")
  (func (export "testfn")
    ${insn})
  (func (export "load8_u") (param i32) (result i32)
    (i32.load8_u (local.get 0)))
)
`);
};

function mem_test(instruction, expected_result_vector) {
    gen_mem_mod_t(instruction);
    print(`(invoke "testfn")`);
    for (let i = 0; i < expected_result_vector.length; i++) {
        print(`(assert_return (invoke "load8_u" (i32.const ${i})) (i32.const ${expected_result_vector[i]}))`);
    }
}

const e = 0;

// This just gives the initial state of the memory, with its active
// initialisers applied.
mem_test("nop",
         [e,e,3,1,4, 1,e,e,e,e, e,e,7,5,2, 3,6,e,e,e, e,e,e,e,e, e,e,e,e,e]);

// Copy non-zero over non-zero
mem_test("(memory.copy (i32.const 13) (i32.const 2) (i32.const 3))",
         [e,e,3,1,4, 1,e,e,e,e, e,e,7,3,1, 4,6,e,e,e, e,e,e,e,e, e,e,e,e,e]);

// Copy non-zero over zero
mem_test("(memory.copy (i32.const 25) (i32.const 15) (i32.const 2))",
         [e,e,3,1,4, 1,e,e,e,e, e,e,7,5,2, 3,6,e,e,e, e,e,e,e,e, 3,6,e,e,e]);

// Copy zero over non-zero
mem_test("(memory.copy (i32.const 13) (i32.const 25) (i32.const 3))",
         [e,e,3,1,4, 1,e,e,e,e, e,e,7,e,e, e,6,e,e,e, e,e,e,e,e, e,e,e,e,e]);

// Copy zero over zero
mem_test("(memory.copy (i32.const 20) (i32.const 22) (i32.const 4))",
         [e,e,3,1,4, 1,e,e,e,e, e,e,7,5,2, 3,6,e,e,e, e,e,e,e,e, e,e,e,e,e]);

// Copy zero and non-zero entries, non overlapping
mem_test("(memory.copy (i32.const 25) (i32.const 1) (i32.const 3))",
         [e,e,3,1,4, 1,e,e,e,e, e,e,7,5,2, 3,6,e,e,e, e,e,e,e,e, e,3,1,e,e]);

// Copy zero and non-zero entries, overlapping, backwards
mem_test("(memory.copy (i32.const 10) (i32.const 12) (i32.const 7))",
         [e,e,3,1,4, 1,e,e,e,e, 7,5,2,3,6, e,e,e,e,e, e,e,e,e,e, e,e,e,e,e]);

// Copy zero and non-zero entries, overlapping, forwards
mem_test("(memory.copy (i32.const 12) (i32.const 10) (i32.const 7))",
         [e,e,3,1,4, 1,e,e,e,e, e,e,e,e,7, 5,2,3,6,e, e,e,e,e,e, e,e,e,e,e]);

// Out-of-bounds tests.
//
// The operation is out of bounds of the memory for the source or target, but
// must perform the operation up to the appropriate bound.  Major cases:
//
// - non-overlapping regions
// - overlapping regions with src >= dest
// - overlapping regions with src == dest
// - overlapping regions with src < dest
// - arithmetic overflow on src addresses
// - arithmetic overflow on target addresses
//
// for each of those,
//
// - src address oob
// - target address oob
// - both oob

function initializers(count, startingAt) {
    let s = "";
    for ( let i=0, j=startingAt; i < count; i++, j++ )
        s += "\\" + (i + 256).toString(16).substring(1);
    return s;
}

function mem_copy(min, max, shared, srcOffs, targetOffs, len, copyDown=false) {
    let memLength = min * PAGESIZE;
    let targetAvail = memLength - targetOffs;
    let srcAvail = memLength - srcOffs;
    let targetLim = targetOffs + Math.min(len, targetAvail, srcAvail);
    let srcLim = srcOffs + Math.min(len, targetAvail, srcAvail);

    print(
`
(module
  (memory (export "mem") ${min} ${max} ${shared})
  (data (i32.const ${srcOffs}) "${initializers(srcLim - srcOffs, 0)}")
  (func (export "run") (param $targetOffs i32) (param $srcOffs i32) (param $len i32)
    (memory.copy (local.get $targetOffs) (local.get $srcOffs) (local.get $len)))
  (func (export "load8_u") (param i32) (result i32)
    (i32.load8_u (local.get 0))))

(assert_trap (invoke "run" (i32.const ${targetOffs}) (i32.const ${srcOffs}) (i32.const ${len}))
             "out of bounds")
`);

    let immediateOOB = copyDown && (srcOffs + len > memLength || targetOffs + len > memLength);

    var t = 0;
    var s = 0;
    var i = 0;
    function checkTarget() {
        if (i >= targetOffs && i < targetLim) {
            print(`(assert_return (invoke "load8_u" (i32.const ${i})) (i32.const ${(t++) & 0xFF}))`);
            if (i >= srcOffs && i < srcLim)
                s++;
            return true;
        }
        return false;
    }
    function checkSource() {
        if (i >= srcOffs && i < srcLim) {
            print(`(assert_return (invoke "load8_u" (i32.const ${i})) (i32.const ${(s++) & 0xFF}))`);
            if (i >= targetOffs && i < targetLim)
                t++;
            return true;
        }
        return false;
    }

    let k = 0;
    for (i=0; i < memLength; i++ ) {
        if (immediateOOB) {
            if (checkSource())
                continue;
        } else {
            if (copyDown && (checkSource() || checkTarget()))
                continue;
            if (!copyDown && (checkTarget() || checkSource()))
                continue;
        }
        // Only spot-check for zero, or we'll be here all night.
        if (++k == 199) {
            print(`(assert_return (invoke "load8_u" (i32.const ${i})) (i32.const 0))`);
            k = 0;
        }
    }
}

// OOB target address, nonoverlapping
mem_copy(1, 1, "", 0, PAGESIZE-20, 40);
mem_copy(1, 1, "", 0, PAGESIZE-21, 39);
if (WITH_SHARED_MEMORY) {
    mem_copy(2, 4, "shared", 0, 2*PAGESIZE-20, 40);
    mem_copy(2, 4, "shared", 0, 2*PAGESIZE-21, 39);
}

// OOB source address, nonoverlapping
mem_copy(1, 1, "", PAGESIZE-20, 0, 40);
mem_copy(1, 1, "", PAGESIZE-21, 0, 39);
if (WITH_SHARED_MEMORY) {
    mem_copy(2, 4, "shared", 2*PAGESIZE-20, 0, 40);
    mem_copy(2, 4, "shared", 2*PAGESIZE-21, 0, 39);
}

// OOB target address, overlapping, src < target
mem_copy(1, 1, "", PAGESIZE-50, PAGESIZE-20, 40, true);

// OOB source address, overlapping, target < src
mem_copy(1, 1, "", PAGESIZE-20, PAGESIZE-50, 40);

// OOB both, overlapping, including target == src
mem_copy(1, 1, "", PAGESIZE-30, PAGESIZE-20, 40, true);
mem_copy(1, 1, "", PAGESIZE-20, PAGESIZE-30, 40);
mem_copy(1, 1, "", PAGESIZE-20, PAGESIZE-20, 40);

// Arithmetic overflow on source address.
/*  FIXME reference interpreter gets this wrong
mem_copy(1, "", "", PAGESIZE-20, 0, 0xFFFFF000);
*/

// Arithmetic overflow on target adddress is an overlapping case.
/*  FIXME reference interpreter gets this wrong
mem_copy(1, 1, "", PAGESIZE-0x1000, PAGESIZE-20, 0xFFFFFF00, true);
*/

// Sundry compilation failures.

// Module doesn't have a memory.
print(
`
(assert_invalid
  (module
    (func (export "testfn")
      (memory.copy (i32.const 10) (i32.const 20) (i32.const 30))))
  "unknown memory 0")
`);

// Invalid argument types.  TODO: We can add anyref, funcref, etc here.
{
    const tys = ['i32', 'f32', 'i64', 'f64'];
    for (let ty1 of tys) {
    for (let ty2 of tys) {
    for (let ty3 of tys) {
        if (ty1 == 'i32' && ty2 == 'i32' && ty3 == 'i32')
            continue;  // this is the only valid case
        print(
`
(assert_invalid
  (module
    (memory 1 1)
    (func (export "testfn")
      (memory.copy (${ty1}.const 10) (${ty2}.const 20) (${ty3}.const 30))))
  "type mismatch")
`);
    }}}
}