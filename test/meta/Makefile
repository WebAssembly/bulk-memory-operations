JSSHELL=~/m-i/js/src/build-debug/dist/bin/js

.PHONY: all

../core/bulk-memory-copy.wast: generate-bulk-memory-copy-tests.js
	$(JSSHELL) $< > $@
