# SpiderMonkey shell
JSSHELL=~/m-i/js/src/build-debug/dist/bin/js -e 'const WITH_SHARED_MEMORY=false;'

TARGETDIR=../core

.PHONY: all

all: $(TARGETDIR)/memory_copy.wast

$(TARGETDIR)/memory_copy.wast: generate_memory_copy.js
	$(JSSHELL) $< > $@
