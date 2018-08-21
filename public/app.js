$(document).ready(function() {
	$.getJSON("/api/todos")
	.then(addTodos)

	$('#todoInput').keypress(function(event) {
		if (event.which == 13) {
			createTodo();
		} 
	});

	$('.list').on('click', 'li', function() {
		updateTodo($(this));
	})

	// Must put event listener on element
	// that exists when the page loads.
	$('.list').on('click', 'span', function(event) {
		event.stopPropagation();
		removeTodo($(this).parent());
	});
}); 

function addTodos(todos) {
	// Add todos to page here.
	todos.forEach(function(todo) {
		addTodo(todo);
	});
}

function addTodo(todo) {
	var newTodo = $('<li class="task">' + todo.name + '<span>X<span></li>');
	
	// Saves the data where jQuery can see it.
	newTodo.data('id', todo._id);
	newTodo.data('completed', todo.completed);
	if (todo.completed) {
		newTodo.addClass("done");
	}
	$('.list').append(newTodo);
}

function createTodo() {
	// Send request to create new todo.
	var userInput = $('#todoInput').val();
	$.post("/api/todos", {name: userInput})
	.then(function(newTodo) {
		$('#todoInput').val('');
		addTodo(newTodo);
	})
	.catch(function(err) {
		console.log(err);
	})
}

function removeTodo(todo) {
	var deleteUrl = '/api/todos/' + todo.data('id');
	$.ajax({
		method: 'DELETE',
		url: deleteUrl
	})
	.then(function(data) {
		todo.remove();
	})
	.catch(function(err) {
		console.log(err);
	})
}

function updateTodo(todo) {
	var updateUrl = '/api/todos/' + todo.data('id');
	var isDone = !todo.data('completed');
	var updateData = {completed: isDone};
	$.ajax({
		method: 'PUT',
		url: updateUrl,
		data: updateData
	})
	.then(function(updatedTodo) {
		todo.toggleClass("done");
		todo.data('completed', isDone);
	})
}