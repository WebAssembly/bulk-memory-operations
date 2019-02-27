# SpiderMonkey shell
JSSHELL=~/m-i/js/src/build-debug/dist/bin/js -e 'const WITH_SHARED_MEMORY=false;'

TARGETDIR=../core

.PHONY: all

all: $(TARGETDIR)/bulk-memory-copy.wast

$(TARGETDIR)/bulk-memory-copy.wast: generate-bulk-memory-copy-tests.js
	$(JSSHELL) $< > $@
