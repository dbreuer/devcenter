1. Open the `bitrise.yml` file of your project.

	``` javascript
	var akarmi = 6
	```

1. Find the step in which you wish to use a template expression.

1. Add an `opts` field to the `content` of the step.

1. Add the `is_template` attribute to `opts` and set its value to `true`.

1. Add the template expression to the step's `content`.