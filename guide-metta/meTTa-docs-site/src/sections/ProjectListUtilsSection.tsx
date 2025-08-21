import React from "react";
import dynamic from "next/dynamic";
import SectionNav, { getNavigationItems } from "../components/SectionNav";
const CodeEditor = dynamic(() => import("../components/CodeEditor"), { ssr: false });

export const ProjectListUtilsSectionHeadings = [
  { id: "list-utils-project", title: "Project 4: List Utilities & Custom Data Types", level: 1 },
  { id: "goal", title: "Project Goal", level: 2 },
  { id: "type-definitions", title: "Type Definitions", level: 2 },
  { id: "basic-operations", title: "Basic List Operations", level: 2 },
  { id: "extremum-functions", title: "Extremum Functions", level: 2 },
  { id: "stack-operations", title: "Stack Operations", level: 2 },
  { id: "list-modification", title: "List Modification", level: 2 },
  { id: "higher-order", title: "Higher-Order Functions", level: 2 },
  { id: "sorting", title: "Sorting Algorithms", level: 2 },
  { id: "examples", title: "Example Usages", level: 2 },
];

const ProjectListUtilsSection = () => {
  const navigation = getNavigationItems("projects/list-utils");
  
  return (
  <div className="max-w-3xl mx-auto px-4 py-8 text-base leading-relaxed text-gray-100 bg-slate-900 rounded-2xl shadow">
    <h1 id="list-utils-project" className="text-3xl font-bold mb-4">Project 3: List Utilities & Custom Data Types</h1>
    <h2 id="goal" className="text-2xl font-semibold mt-8 mb-2">Project Goal</h2>
    <p className="mb-4">
      The goal of this project is to learn how to define and use custom data types in MeTTa, and to build a suite of utility functions for working with lists. You'll see how to define a generic list type, implement common list operations, and use higher-order functions and recursion to manipulate data structures in a functional style.
    </p>

    <h2 id="type-definitions" className="text-2xl font-semibold mt-8 mb-2">Type Definitions</h2>
    <p className="mb-4">
      We start by defining a generic <code>List</code> type, along with the constructors <code>Nil</code> (empty list) and <code>Cons</code> (add an element to the front). This is similar to how lists are defined in Haskell or ML.
    </p>
    <CodeEditor language="metta" initialCode={`(: List (-> $a Type))
(: Nil (List $a))
(: Cons (-> $a (List $a) (List $a))`} />

    <h2 id="basic-operations" className="text-2xl font-semibold mt-8 mb-2">Basic List Operations</h2>
    <p className="mb-4">
      Let's implement some basic operations: computing the length of a list, checking membership, and appending an element. These are all defined recursively, using pattern matching on <code>Nil</code> and <code>Cons</code>.
    </p>
    <CodeEditor language="metta" initialCode={`(: length (-> (List $a) Number))
(= (length Nil) 0)
(= (length (Cons $x $xs)) 
   (+ 1 (length $xs)))

(: is-member (-> $a (List $a) Bool))
(= (is-member $num Nil) False)
(= (is-member $num (Cons $head $tail))
   (if (== $num $head)
       True
       (is-member $num $tail)))

(: append (-> $a (List $a) (List $a)))
(= (append $num Nil) (Cons $num Nil))
(= (append $num (Cons $head $tail))
   (Cons $head (append $num $tail)))`} />

    <h2 id="extremum-functions" className="text-2xl font-semibold mt-8 mb-2">Extremum Functions</h2>
    <p className="mb-4">
      Next, we define functions to find the minimum and maximum values in a list of numbers. These use recursion and <code>let*</code> to keep track of the current extremum.
    </p>
    <CodeEditor language="metta" initialCode={`(: min-value (-> (List Number) Number))
(= (min-value (Cons $x Nil)) $x)
(= (min-value (Cons $x (Cons $y $ys)))
   (let*    (
                ($min-rest (min-value (Cons $y $ys)))
            )
            (if (< $x $min-rest) 
                $x 
                $min-rest)
    )
)

(: max-value (-> (List Number) Number))
(= (max-value (Cons $x Nil)) $x)
(= (max-value (Cons $x (Cons $y $ys)))
   (let* (($max-rest (max-value (Cons $y $ys))))
     (if (> $x $max-rest) $x $max-rest)))`} />

    <h2 id="stack-operations" className="text-2xl font-semibold mt-8 mb-2">Stack Operations</h2>
    <p className="mb-4">
      We can use lists as stacks. Here is a <code>pop</code> function that removes the last element from a list (or returns <code>Nil</code> if the list is empty or has one element).
    </p>
    <CodeEditor language="metta" initialCode={`(: pop (-> (List $a) (List $a)))
(= (pop Nil) Nil)
(= (pop (Cons $x Nil)) Nil)
(= (pop (Cons $x (Cons $y $ys)))
   (Cons $x (pop (Cons $y $ys))))`} />

    <h2 id="list-modification" className="text-2xl font-semibold mt-8 mb-2">List Modification</h2>
    <p className="mb-4">
      Here are functions to remove an element, reverse a list, and remove duplicates. <code>reverse</code> uses a helper function with an accumulator for efficiency.
    </p>
    <CodeEditor language="metta" initialCode={`(: remove-element (-> $a (List $a) (List $a)))
(= (remove-element $num Nil) Nil)
(= (remove-element $num (Cons $head $tail))
   (if (== $head $num)
       (remove-element $num $tail)
       (Cons $head (remove-element $num $tail))))

(: reverse (-> (List $a) (List $a)))
(= (reverse $list) (reverse-helper $list Nil))

(: reverse-helper (-> (List $a) (List $a) (List $a)))
(= (reverse-helper Nil $acc) $acc)
(= (reverse-helper (Cons $head $tail) $acc)
   (reverse-helper $tail (Cons $head $acc)))`} />

    <h2 id="higher-order" className="text-2xl font-semibold mt-8 mb-2">Higher-Order Functions</h2>
    <p className="mb-4">
      MeTTa supports higher-order functions. Here are <code>map</code>, <code>filter</code>, <code>foldl</code>, and <code>foldr</code> for lists, plus a function to remove duplicates using a helper.
    </p>
    <CodeEditor language="metta" initialCode={`(: map (-> (-> $a $b) (List $a) (List $b)))
(= (map $f Nil) Nil)
(= (map $f (Cons $x $xs))
   (Cons ($f $x) (map $f $xs)))

(: filter (-> (-> $a Boolean) (List $a) (List $a)))
(= (filter $pred Nil) Nil)
(= (filter $pred (Cons $head $tail))
   (if ($pred $head)
       (Cons $head (filter $pred $tail))
       (filter $pred $tail)))

(: foldl (-> (-> $b $a $b) $b (List $a) $b))
(= (foldl $func $acc Nil) $acc)
(= (foldl $func $acc (Cons $head $tail))
   (foldl $func ($func $acc $head) $tail))

(: foldr (-> (-> $a $b $b) $b (List $a) $b))
(= (foldr $func $acc Nil) $acc)
(= (foldr $func $acc (Cons $head $tail))
   ($func $head (foldr $func $acc $tail)))

(: remove-duplicates (-> (List $a) (List $a)))
(= (remove-duplicates $list)
   (remove-duplicates-helper $list Nil))

(: remove-duplicates-helper (-> (List $a) (List $a) (List $a)))
(= (remove-duplicates-helper Nil $seen) Nil)
(= (remove-duplicates-helper (Cons $head $tail) $seen)
   (if (is-member $head $seen)
       (remove-duplicates-helper $tail $seen)
       (Cons $head (remove-duplicates-helper $tail (Cons $head $seen)))))`} />

    <h2 id="sorting" className="text-2xl font-semibold mt-8 mb-2">Sorting Algorithms</h2>
    <p className="mb-4">
      As a more advanced example, here is a recursive quicksort implementation for lists of numbers, using helper functions to filter elements greater or less than a pivot.
    </p>
    <CodeEditor language="metta" initialCode={`(: filter-greater (-> Number (List Number) (List Number)))
(= (filter-greater $x Nil) Nil)
(= (filter-greater $x (Cons $y $ys)) 
   (if (> $y $x)  
       (Cons $y (filter-greater $x $ys))
       (filter-greater $x $ys)))

(: filter-less (-> Number (List Number) (List Number)))
(= (filter-less $x Nil) Nil)
(= (filter-less $x (Cons $y $ys)) 
   (if (< $y $x)  
       (Cons $y (filter-less $x $ys))
       (filter-less $x $ys)))

(: quicksort (-> (List Number) (List Number)))
(= (quicksort Nil) Nil)
(= (quicksort (Cons $pivot $rest))
   (let* (($lesser (filter-less $pivot $rest))
          ($greater (filter-greater $pivot $rest))
          ($sorted-lesser (quicksort $lesser))
          ($sorted-greater (quicksort $greater)))
     (concat $sorted-lesser 
             (Cons $pivot $sorted-greater))))

(: concat (-> (List $a) (List $a) (List $a)))
(= (concat Nil $b) $b)
(= (concat (Cons $head $tail) $b)
   (Cons $head (concat $tail $b)))`} />

    <h2 id="examples" className="text-2xl font-semibold mt-8 mb-2">Example Usages</h2>
    <p className="mb-4">
      Here is the complete code for all the list utilities and example usages. You can copy and run this as a single block in MeTTa:
    </p>
    <CodeEditor language="metta" initialCode={`;; ===================== ;;
;; List Utility Functions ;;
;; ===================== ;;

;; Type Definitions
(: List (-> $a Type))
(: Nil (List $a))
(: Cons (-> $a (List $a) (List $a)))

;; ===================== ;;
;; Basic List Operations ;;
;; ===================== ;;

(: length (-> (List $a) Number))
(= (length Nil) 0)
(= (length (Cons $x $xs)) 
   (+ 1 (length $xs)))

(: is-member (-> $a (List $a) Bool))
(= (is-member $num Nil) False)
(= (is-member $num (Cons $head $tail))
   (if (== $num $head)
       True
       (is-member $num $tail)))

(: append (-> $a (List $a) (List $a)))
(= (append $num Nil) (Cons $num Nil))
(= (append $num (Cons $head $tail))
   (Cons $head (append $num $tail)))

;; ===================== ;;
;; Extremum Functions ;;
;; ===================== ;;

(: min-value (-> (List Number) Number))
(= (min-value (Cons $x Nil)) $x)
(= (min-value (Cons $x (Cons $y $ys)))
   (let*    (
                ($min-rest (min-value (Cons $y $ys)))
            )
            (if (< $x $min-rest) 
                $x 
                $min-rest)
    )
)

(: max-value (-> (List Number) Number))
(= (max-value (Cons $x Nil)) $x)
(= (max-value (Cons $x (Cons $y $ys)))
   (let* (($max-rest (max-value (Cons $y $ys))))
     (if (> $x $max-rest) $x $max-rest)))

;; ===================== ;;
;; Stack Operations ;;
;; ===================== ;;

(: pop (-> (List $a) (List $a)))
(= (pop Nil) Nil)
(= (pop (Cons $x Nil)) Nil)
(= (pop (Cons $x (Cons $y $ys)))
   (Cons $x (pop (Cons $y $ys))))

;; ===================== ;;
;; List Modification ;;
;; ===================== ;;

(: remove-element (-> $a (List $a) (List $a)))
(= (remove-element $num Nil) Nil)
(= (remove-element $num (Cons $head $tail))
   (if (== $head $num)
       (remove-element $num $tail)
       (Cons $head (remove-element $num $tail))))

(: reverse (-> (List $a) (List $a)))
(= (reverse $list) (reverse-helper $list Nil))

(: reverse-helper (-> (List $a) (List $a) (List $a)))
(= (reverse-helper Nil $acc) $acc)
(= (reverse-helper (Cons $head $tail) $acc)
   (reverse-helper $tail (Cons $head $acc)))

;; ===================== ;;
;; Higher-Order Functions ;;
;; ===================== ;;

(: map (-> (-> $a $b) (List $a) (List $b)))
(= (map $f Nil) Nil)
(= (map $f (Cons $x $xs))
   (Cons ($f $x) (map $f $xs)))

(: filter (-> (-> $a Boolean) (List $a) (List $a)))
(= (filter $pred Nil) Nil)
(= (filter $pred (Cons $head $tail))
   (if ($pred $head)
       (Cons $head (filter $pred $tail))
       (filter $pred $tail)))

(: foldl (-> (-> $b $a $b) $b (List $a) $b))
(= (foldl $func $acc Nil) $acc)
(= (foldl $func $acc (Cons $head $tail))
   (foldl $func ($func $acc $head) $tail))

(: foldr (-> (-> $a $b $b) $b (List $a) $b))
(= (foldr $func $acc Nil) $acc)
(= (foldr $func $acc (Cons $head $tail))
   ($func $head (foldr $func $acc $tail)))

(: remove-duplicates (-> (List $a) (List $a)))
(= (remove-duplicates $list)
   (remove-duplicates-helper $list Nil))

(: remove-duplicates-helper (-> (List $a) (List $a) (List $a)))
(= (remove-duplicates-helper Nil $seen) Nil)
(= (remove-duplicates-helper (Cons $head $tail) $seen)
   (if (is-member $head $seen)
       (remove-duplicates-helper $tail $seen)
       (Cons $head (remove-duplicates-helper $tail (Cons $head $seen)))))

;; ===================== ;;
;; Sorting Algorithms ;;
;; ===================== ;;

(: filter-greater (-> Number (List Number) (List Number)))
(= (filter-greater $x Nil) Nil)
(= (filter-greater $x (Cons $y $ys)) 
   (if (> $y $x)  
       (Cons $y (filter-greater $x $ys))
       (filter-greater $x $ys)))

(: filter-less (-> Number (List Number) (List Number)))
(= (filter-less $x Nil) Nil)
(= (filter-less $x (Cons $y $ys)) 
   (if (< $y $x)  
       (Cons $y (filter-less $x $ys))
       (filter-less $x $ys)))

(: quicksort (-> (List Number) (List Number)))
(= (quicksort Nil) Nil)
(= (quicksort (Cons $pivot $rest))
   (let* (($lesser (filter-less $pivot $rest))
          ($greater (filter-greater $pivot $rest))
          ($sorted-lesser (quicksort $lesser))
          ($sorted-greater (quicksort $greater)))
     (concat $sorted-lesser 
             (Cons $pivot $sorted-greater))))

(: concat (-> (List $a) (List $a) (List $a)))
(= (concat Nil $b) $b)
(= (concat (Cons $head $tail) $b)
   (Cons $head (concat $tail $b)))

;; ===================== ;;
;; Example Usages ;;
;; ===================== ;;

;; Predicates for filter examples
(= (less-than-3 $x) (< $x 3))
(= (greater-eq-5 $x) (>= $x 5))

;; Test Cases
! (length (Cons 1 (Cons 2 (Cons 3 Nil))))
! (is-member 1 (Cons 1 (Cons 2 (Cons 3 Nil))))
! (append 100 (Cons 1 (Cons 2 Nil)))
! (max-value (Cons 1 (Cons 2 (Cons 3 (Cons 4 (Cons 5 Nil))))))
! (min-value (Cons 100 (Cons 101 (Cons 200 (Cons 400 (Cons -1 (Cons 500 Nil)))))))
! (pop (Cons 1 (Cons 2 (Cons 3 Nil))))
! (reverse (Cons 3 (Cons 2 (Cons 1 Nil))))
! (remove-element 10 (Cons 10 (Cons 1 Nil)))
! (filter less-than-3 (Cons 1 (Cons 2 (Cons 3 (Cons 4 (Cons 5 Nil))))))
! (filter greater-eq-5 (Cons 1 (Cons 2 (Cons 3 (Cons 4 (Cons 5 (Cons 6 Nil)))))))
! (foldr + 0 (Cons 1 (Cons 2 (Cons 3 (Cons 4 Nil)))))
! (quicksort (Cons 8 (Cons 7 (Cons 6 (Cons 1 (Cons 0 (Cons 9 (Cons 2 Nil))))))))
! (remove-duplicates (Cons 1 (Cons 2 (Cons 2 (Cons 3 (Cons 1 (Cons 4 Nil)))))))`} />
    <SectionNav previous={navigation.previous} next={navigation.next} />
  </div>
  );
};

export default ProjectListUtilsSection; 