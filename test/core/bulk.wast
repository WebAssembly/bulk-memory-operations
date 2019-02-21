(module
  (memory 1)

  (func (export "fill") (param i32 i32 i32)
    (memory.fill
      (get_local 0)
      (get_local 1)
      (get_local 2)))

  (func (export "load8_u") (param i32) (result i32)
    (i32.load8_u (get_local 0)))
)

;; Basic fill test.
(invoke "fill" (i32.const 1) (i32.const 0xff) (i32.const 3))
(assert_return (invoke "load8_u" (i32.const 0)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 1)) (i32.const 0xff))
(assert_return (invoke "load8_u" (i32.const 2)) (i32.const 0xff))
(assert_return (invoke "load8_u" (i32.const 3)) (i32.const 0xff))
(assert_return (invoke "load8_u" (i32.const 4)) (i32.const 0))

;; Fill value is stored as a byte.
(invoke "fill" (i32.const 0) (i32.const 0xbbaa) (i32.const 2))
(assert_return (invoke "load8_u" (i32.const 0)) (i32.const 0xaa))
(assert_return (invoke "load8_u" (i32.const 1)) (i32.const 0xaa))

;; Fill all of memory
(invoke "fill" (i32.const 0) (i32.const 0) (i32.const 0x10000))

;; Out-of-bounds writes trap, but all previous writes succeed.
(assert_trap (invoke "fill" (i32.const 0xff00) (i32.const 1) (i32.const 0x101))
    "out of bounds memory access")
(assert_return (invoke "load8_u" (i32.const 0xff00)) (i32.const 1))
(assert_return (invoke "load8_u" (i32.const 0xffff)) (i32.const 1))

;; Fail on out-of-bounds even if filling 0 bytes.
(assert_trap (invoke "fill" (i32.const 0x10000) (i32.const 0) (i32.const 0))
    "out of bounds memory access")


(module
  (memory (data "\aa\bb\cc\dd"))

  (func (export "copy") (param i32 i32 i32)
    (memory.copy
      (get_local 0)
      (get_local 1)
      (get_local 2)))

  (func (export "load8_u") (param i32) (result i32)
    (i32.load8_u (get_local 0)))
)

;; Non-overlapping copy.
(invoke "copy" (i32.const 10) (i32.const 0) (i32.const 4))

(assert_return (invoke "load8_u" (i32.const 9)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 10)) (i32.const 0xaa))
(assert_return (invoke "load8_u" (i32.const 11)) (i32.const 0xbb))
(assert_return (invoke "load8_u" (i32.const 12)) (i32.const 0xcc))
(assert_return (invoke "load8_u" (i32.const 13)) (i32.const 0xdd))
(assert_return (invoke "load8_u" (i32.const 14)) (i32.const 0))

;; Overlap, source > dest
(invoke "copy" (i32.const 8) (i32.const 10) (i32.const 4))
(assert_return (invoke "load8_u" (i32.const 8)) (i32.const 0xaa))
(assert_return (invoke "load8_u" (i32.const 9)) (i32.const 0xbb))
(assert_return (invoke "load8_u" (i32.const 10)) (i32.const 0xcc))
(assert_return (invoke "load8_u" (i32.const 11)) (i32.const 0xdd))
(assert_return (invoke "load8_u" (i32.const 12)) (i32.const 0xcc))
(assert_return (invoke "load8_u" (i32.const 13)) (i32.const 0xdd))

;; Overlap, source < dest
(invoke "copy" (i32.const 10) (i32.const 7) (i32.const 6))
(assert_return (invoke "load8_u" (i32.const 10)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 11)) (i32.const 0xaa))
(assert_return (invoke "load8_u" (i32.const 12)) (i32.const 0xbb))
(assert_return (invoke "load8_u" (i32.const 13)) (i32.const 0xcc))
(assert_return (invoke "load8_u" (i32.const 14)) (i32.const 0xdd))
(assert_return (invoke "load8_u" (i32.const 15)) (i32.const 0xcc))
(assert_return (invoke "load8_u" (i32.const 16)) (i32.const 0))

;; Copy ending at memory limit is ok.
(invoke "copy" (i32.const 0xff00) (i32.const 0) (i32.const 0x100))
(invoke "copy" (i32.const 0xfe00) (i32.const 0xff00) (i32.const 0x100))

;; Out-of-bounds writes trap, but all previous writes succeed.
(assert_trap (invoke "copy" (i32.const 0xfffe) (i32.const 0) (i32.const 3))
    "out of bounds memory access")
(assert_return (invoke "load8_u" (i32.const 0xfffe)) (i32.const 0xaa))
(assert_return (invoke "load8_u" (i32.const 0xffff)) (i32.const 0xbb))

;; Fail on out-of-bounds even if copying 0 bytes.
(assert_trap (invoke "copy" (i32.const 0x10000) (i32.const 0) (i32.const 0))
    "out of bounds memory access")
(assert_trap (invoke "copy" (i32.const 0) (i32.const 0x10000) (i32.const 0))
    "out of bounds memory access")
