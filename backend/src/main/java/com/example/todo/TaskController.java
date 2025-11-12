package com.example.todo;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;


@CrossOrigin(origins = "http://localhost:5500")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
	private Map<Long, Task> store = new LinkedHashMap<>();
	private AtomicLong idSeq = new AtomicLong(1);

	@GetMapping
	public Collection<Task> all() {
		return store.values();
	}

	
	@PostMapping
	public Task create(@RequestBody Task task) {
		long id =idSeq.getAndIncrement();
		task.setId(id);
		store.put(id, task);
		return task;
	}


	@PutMapping("/{id}")
	public Task update(@PathVariable Long id, @RequestBody Task t) {
		Task existing = store.get(id);
		if (existing == null) return null;
		existing.setText(t.getText());
		existing.setDone(t.isDone());
		return existing;
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		store.remove(id);
	}
}
 
