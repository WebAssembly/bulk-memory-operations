JSSHELL=~/m-i/js/src/build-debug/dist/bin/js
TARGETDIR=../core

.PHONY: all

all: $(TARGETDIR)/bulk-memory-copy.wast

$(TARGETDIR)/bulk-memory-copy.wast: generate-bulk-memory-copy-tests.js
	$(JSSHELL) $< > $@
