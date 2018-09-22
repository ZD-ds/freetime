function Compile(node, vm) {
    if (node) {
        this.$frag = this.nodeToFragment(node, vm);
        return this.$frag;
    }
}
Compile.prototype = {
    nodeToFragment: function (node, vm) {
        var self = this;
        var frag = document.createDocumentFragment();
        var child;
        while (child = node.firstChild) {
            self.compileElement(child, vm);
            frag.append(child)
        }
        return frag;
    },
    compileElement: function (node, vm) {
        var reg = /\{\{(.*)\}\}/;
        //  如果类型为节点
        if (node.nodeType === 1) {
            var attr = node.attributes;
            for (var i = 0; i < attr.length; i++) {
                if (attr[i].nodeName == 'v-model') {
                    var name = attr[i].nodeValue;//获得VM的值
                    node.addEventListener('input', function (e) {
                        vm[name] = e.target.value;
                    });
                    new Watcher(vm, node, name, value);
                }
            }
        }
        //如果类型为text
        if (node.nodeType === 3) {
            if (reg.test(node.nodeValue)) {
                var name = RegExp.$1;//获得匹配到的字符串
                name = name.trim();
                new Watcher(vm, node, name, 'nodeValue');
            }
        }
    },
}