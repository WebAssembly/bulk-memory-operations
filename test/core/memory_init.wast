;;
;; Generated by ../meta/generate_memory_init.js
;;

(module
  (memory (export "memory0") 1 1)
  (data (i32.const 2) "\03\01\04\01")
  (data passive "\02\07\01\08")
  (data (i32.const 12) "\07\05\02\03\06")
  (data passive "\05\09\02\07\06")
  (func (export "test")
    nop)
  (func (export "load8_u") (param i32) (result i32)
    (i32.load8_u (local.get 0))))

(invoke "test")

(assert_return (invoke "load8_u" (i32.const 0)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 1)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 2)) (i32.const 3))
(assert_return (invoke "load8_u" (i32.const 3)) (i32.const 1))
(assert_return (invoke "load8_u" (i32.const 4)) (i32.const 4))
(assert_return (invoke "load8_u" (i32.const 5)) (i32.const 1))
(assert_return (invoke "load8_u" (i32.const 6)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 7)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 8)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 9)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 10)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 11)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 12)) (i32.const 7))
(assert_return (invoke "load8_u" (i32.const 13)) (i32.const 5))
(assert_return (invoke "load8_u" (i32.const 14)) (i32.const 2))
(assert_return (invoke "load8_u" (i32.const 15)) (i32.const 3))
(assert_return (invoke "load8_u" (i32.const 16)) (i32.const 6))
(assert_return (invoke "load8_u" (i32.const 17)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 18)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 19)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 20)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 21)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 22)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 23)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 24)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 25)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 26)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 27)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 28)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 29)) (i32.const 0))

(module
  (memory (export "memory0") 1 1)
  (data (i32.const 2) "\03\01\04\01")
  (data passive "\02\07\01\08")
  (data (i32.const 12) "\07\05\02\03\06")
  (data passive "\05\09\02\07\06")
  (func (export "test")
    (memory.init 1 (i32.const 7) (i32.const 0) (i32.const 4)))
  (func (export "load8_u") (param i32) (result i32)
    (i32.load8_u (local.get 0))))

(invoke "test")

(assert_return (invoke "load8_u" (i32.const 0)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 1)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 2)) (i32.const 3))
(assert_return (invoke "load8_u" (i32.const 3)) (i32.const 1))
(assert_return (invoke "load8_u" (i32.const 4)) (i32.const 4))
(assert_return (invoke "load8_u" (i32.const 5)) (i32.const 1))
(assert_return (invoke "load8_u" (i32.const 6)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 7)) (i32.const 2))
(assert_return (invoke "load8_u" (i32.const 8)) (i32.const 7))
(assert_return (invoke "load8_u" (i32.const 9)) (i32.const 1))
(assert_return (invoke "load8_u" (i32.const 10)) (i32.const 8))
(assert_return (invoke "load8_u" (i32.const 11)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 12)) (i32.const 7))
(assert_return (invoke "load8_u" (i32.const 13)) (i32.const 5))
(assert_return (invoke "load8_u" (i32.const 14)) (i32.const 2))
(assert_return (invoke "load8_u" (i32.const 15)) (i32.const 3))
(assert_return (invoke "load8_u" (i32.const 16)) (i32.const 6))
(assert_return (invoke "load8_u" (i32.const 17)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 18)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 19)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 20)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 21)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 22)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 23)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 24)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 25)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 26)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 27)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 28)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 29)) (i32.const 0))

(module
  (memory (export "memory0") 1 1)
  (data (i32.const 2) "\03\01\04\01")
  (data passive "\02\07\01\08")
  (data (i32.const 12) "\07\05\02\03\06")
  (data passive "\05\09\02\07\06")
  (func (export "test")
    (memory.init 3 (i32.const 15) (i32.const 1) (i32.const 3)))
  (func (export "load8_u") (param i32) (result i32)
    (i32.load8_u (local.get 0))))

(invoke "test")

(assert_return (invoke "load8_u" (i32.const 0)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 1)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 2)) (i32.const 3))
(assert_return (invoke "load8_u" (i32.const 3)) (i32.const 1))
(assert_return (invoke "load8_u" (i32.const 4)) (i32.const 4))
(assert_return (invoke "load8_u" (i32.const 5)) (i32.const 1))
(assert_return (invoke "load8_u" (i32.const 6)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 7)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 8)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 9)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 10)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 11)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 12)) (i32.const 7))
(assert_return (invoke "load8_u" (i32.const 13)) (i32.const 5))
(assert_return (invoke "load8_u" (i32.const 14)) (i32.const 2))
(assert_return (invoke "load8_u" (i32.const 15)) (i32.const 9))
(assert_return (invoke "load8_u" (i32.const 16)) (i32.const 2))
(assert_return (invoke "load8_u" (i32.const 17)) (i32.const 7))
(assert_return (invoke "load8_u" (i32.const 18)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 19)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 20)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 21)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 22)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 23)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 24)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 25)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 26)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 27)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 28)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 29)) (i32.const 0))

(module
  (memory (export "memory0") 1 1)
  (data (i32.const 2) "\03\01\04\01")
  (data passive "\02\07\01\08")
  (data (i32.const 12) "\07\05\02\03\06")
  (data passive "\05\09\02\07\06")
  (func (export "test")
    (memory.init 1 (i32.const 7) (i32.const 0) (i32.const 4)) 
data.drop 1 
(memory.init 3 (i32.const 15) (i32.const 1) (i32.const 3)) 
data.drop 3 
(memory.copy (i32.const 20) (i32.const 15) (i32.const 5)) 
(memory.copy (i32.const 21) (i32.const 29) (i32.const 1)) 
(memory.copy (i32.const 24) (i32.const 10) (i32.const 1)) 
(memory.copy (i32.const 13) (i32.const 11) (i32.const 4)) 
(memory.copy (i32.const 19) (i32.const 20) (i32.const 5)))
  (func (export "load8_u") (param i32) (result i32)
    (i32.load8_u (local.get 0))))

(invoke "test")

(assert_return (invoke "load8_u" (i32.const 0)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 1)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 2)) (i32.const 3))
(assert_return (invoke "load8_u" (i32.const 3)) (i32.const 1))
(assert_return (invoke "load8_u" (i32.const 4)) (i32.const 4))
(assert_return (invoke "load8_u" (i32.const 5)) (i32.const 1))
(assert_return (invoke "load8_u" (i32.const 6)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 7)) (i32.const 2))
(assert_return (invoke "load8_u" (i32.const 8)) (i32.const 7))
(assert_return (invoke "load8_u" (i32.const 9)) (i32.const 1))
(assert_return (invoke "load8_u" (i32.const 10)) (i32.const 8))
(assert_return (invoke "load8_u" (i32.const 11)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 12)) (i32.const 7))
(assert_return (invoke "load8_u" (i32.const 13)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 14)) (i32.const 7))
(assert_return (invoke "load8_u" (i32.const 15)) (i32.const 5))
(assert_return (invoke "load8_u" (i32.const 16)) (i32.const 2))
(assert_return (invoke "load8_u" (i32.const 17)) (i32.const 7))
(assert_return (invoke "load8_u" (i32.const 18)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 19)) (i32.const 9))
(assert_return (invoke "load8_u" (i32.const 20)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 21)) (i32.const 7))
(assert_return (invoke "load8_u" (i32.const 22)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 23)) (i32.const 8))
(assert_return (invoke "load8_u" (i32.const 24)) (i32.const 8))
(assert_return (invoke "load8_u" (i32.const 25)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 26)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 27)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 28)) (i32.const 0))
(assert_return (invoke "load8_u" (i32.const 29)) (i32.const 0))
(assert_invalid
   (module
     (func (export "test")
       (data.drop 0)))
   "unknown memory 0")

(assert_invalid
  (module
    (memory 1)
     (data passive "\37")
    (func (export "test")
      (data.drop 4)))
  "unknown data segment")

(module
  (memory 1)
     (data passive "\37")
  (func (export "test")
    (data.drop 0)
    (data.drop 0)))
(assert_trap (invoke "test") "data segment dropped")

(module
  (memory 1)
     (data passive "\37")
  (func (export "test")
    (data.drop 0)
    (memory.init 0 (i32.const 1234) (i32.const 1) (i32.const 1))))
(assert_trap (invoke "test") "data segment dropped")

(assert_invalid
  (module
    (func (export "test")
      (memory.init 1 (i32.const 1234) (i32.const 1) (i32.const 1))))
  "unknown memory 0")

(assert_invalid
  (module
    (memory 1)
     (data passive "\37")
    (func (export "test")
      (memory.init 1 (i32.const 1234) (i32.const 1) (i32.const 1))))
  "unknown data segment 1")

(module
  (memory 1)
     (data passive "\37")
  (func (export "test")
    (memory.init 0 (i32.const 1) (i32.const 0) (i32.const 1))
    (memory.init 0 (i32.const 1) (i32.const 0) (i32.const 1))))
(invoke "test")

(module
  (memory 1)
     (data passive "\37")
  (func (export "test")
    (memory.init 0 (i32.const 1234) (i32.const 2) (i32.const 3))))
(assert_trap (invoke "test") "out of bounds")

(module
  (memory 1)
     (data passive "\37")
  (func (export "test")
    (memory.init 0 (i32.const 1234) (i32.const 4) (i32.const 0))))
(assert_trap (invoke "test") "out of bounds")

(module
  (memory 1)
     (data passive "\37")
  (func (export "test")
    (memory.init 0 (i32.const 0x10000) (i32.const 2) (i32.const 0))))
(assert_trap (invoke "test") "out of bounds")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i32.const 1) (i32.const 1) (f32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i32.const 1) (i32.const 1) (i64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i32.const 1) (i32.const 1) (f64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i32.const 1) (f32.const 1) (i32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i32.const 1) (f32.const 1) (f32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i32.const 1) (f32.const 1) (i64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i32.const 1) (f32.const 1) (f64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i32.const 1) (i64.const 1) (i32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i32.const 1) (i64.const 1) (f32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i32.const 1) (i64.const 1) (i64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i32.const 1) (i64.const 1) (f64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i32.const 1) (f64.const 1) (i32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i32.const 1) (f64.const 1) (f32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i32.const 1) (f64.const 1) (i64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i32.const 1) (f64.const 1) (f64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f32.const 1) (i32.const 1) (i32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f32.const 1) (i32.const 1) (f32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f32.const 1) (i32.const 1) (i64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f32.const 1) (i32.const 1) (f64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f32.const 1) (f32.const 1) (i32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f32.const 1) (f32.const 1) (f32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f32.const 1) (f32.const 1) (i64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f32.const 1) (f32.const 1) (f64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f32.const 1) (i64.const 1) (i32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f32.const 1) (i64.const 1) (f32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f32.const 1) (i64.const 1) (i64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f32.const 1) (i64.const 1) (f64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f32.const 1) (f64.const 1) (i32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f32.const 1) (f64.const 1) (f32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f32.const 1) (f64.const 1) (i64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f32.const 1) (f64.const 1) (f64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i64.const 1) (i32.const 1) (i32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i64.const 1) (i32.const 1) (f32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i64.const 1) (i32.const 1) (i64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i64.const 1) (i32.const 1) (f64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i64.const 1) (f32.const 1) (i32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i64.const 1) (f32.const 1) (f32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i64.const 1) (f32.const 1) (i64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i64.const 1) (f32.const 1) (f64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i64.const 1) (i64.const 1) (i32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i64.const 1) (i64.const 1) (f32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i64.const 1) (i64.const 1) (i64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i64.const 1) (i64.const 1) (f64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i64.const 1) (f64.const 1) (i32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i64.const 1) (f64.const 1) (f32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i64.const 1) (f64.const 1) (i64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (i64.const 1) (f64.const 1) (f64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f64.const 1) (i32.const 1) (i32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f64.const 1) (i32.const 1) (f32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f64.const 1) (i32.const 1) (i64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f64.const 1) (i32.const 1) (f64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f64.const 1) (f32.const 1) (i32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f64.const 1) (f32.const 1) (f32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f64.const 1) (f32.const 1) (i64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f64.const 1) (f32.const 1) (f64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f64.const 1) (i64.const 1) (i32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f64.const 1) (i64.const 1) (f32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f64.const 1) (i64.const 1) (i64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f64.const 1) (i64.const 1) (f64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f64.const 1) (f64.const 1) (i32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f64.const 1) (f64.const 1) (f32.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f64.const 1) (f64.const 1) (i64.const 1))))
   "type mismatch")

(assert_invalid
   (module
     (memory 1)
     (data passive "\37")
     (func (export "test")
       (memory.init 0 (f64.const 1) (f64.const 1) (f64.const 1))))
   "type mismatch")

