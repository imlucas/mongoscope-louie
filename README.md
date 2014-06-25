# mongoscope-louie

Load testing and traffic simulation for mongoscope.  Uses the rest api
to make log normal requests across all namespaces in a db.

```
./bin/louie.js -h
Make mongoscope dance.
Usage: node ./bin/louie.js

Options:
  -u, --scope  root url of the scope to point at       [default: "http://localhost:29017"]
  -s, --seed   seed mongo url to run commands against
```
