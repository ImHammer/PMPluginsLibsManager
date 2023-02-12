package main

func ArrayFilter[A ~[]V, V any](arr A, exec func(V) bool) A {
	newArr := make([]V, 0)
	for _, v := range arr {
		if exec(v) {
			newArr = append(newArr, v)
		}
	}
	return newArr
}

func ArrayMap[A ~[]V, V any, B any](arr A, exec func(V) B) []B {
	newArr := make([]B, 0)
	for _, v := range arr {
		newArr = append(newArr, exec(v))
	}
	return newArr
}

func ArrayContainsExec[A ~[]V, V any](arr A, contains V, exec func(value, comparable V) bool) bool {
	for _, v := range arr {
		if exec(v, contains) {
			return true
		}
	}
	return false
}
