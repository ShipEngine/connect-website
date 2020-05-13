Thoughts
========

apps:new
--------
* Not sure I like the `apps-new.ts` having to known about each file to copy it from the source to the destination context, will that get a bit unmanegable as we add more files/examples/app-types?
  * At least split each out into a separate file?


apps
-----
Is listing the apps the best default behavior? Or would it be better served as apps:list?

app-test-harness
----------------
- Have the user create sample return objects for their api calls?
  - What if the user has to make multiple api calls???
- The CLI should set `NODE_ENV` to "test". That's the standard way of indicating a test environment in Node?