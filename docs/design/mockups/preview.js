// Minimal renderer so the exported mock-ups open straight from disk.
// Supports what the mock-ups use: {{path}} in text and attributes,
// <sc-for list as>, <sc-if value>, <helmet>, onClick handlers and setState.
(function () {
  class DCLogic {
    constructor(props) { this.props = props || {}; this.state = {}; }
    setState(patch) { Object.assign(this.state, patch); render(); }
  }
  window.DCLogic = DCLogic;

  var root, template, instance;
  var EXPR = /\{\{\s*([^}]+?)\s*\}\}/g;

  function lookup(path, scope) {
    if (path === 'true') return true;
    if (path === 'false') return false;
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, scope);
  }
  function interpolate(text, scope) {
    return text.replace(EXPR, function (_, p) { var v = lookup(p, scope); return v == null ? '' : String(v); });
  }
  function single(text, scope) {
    var m = /^\{\{\s*([^}]+?)\s*\}\}$/.exec(text.trim());
    return m ? lookup(m[1], scope) : text;
  }

  function build(node, scope, out) {
    if (node.nodeType === 3) { out.appendChild(document.createTextNode(interpolate(node.nodeValue, scope))); return; }
    if (node.nodeType !== 1) return;
    var tag = node.tagName.toLowerCase();
    if (tag === 'helmet') return;
    if (tag === 'sc-for') {
      var list = single(node.getAttribute('list'), scope) || [];
      var as = node.getAttribute('as');
      list.forEach(function (item) {
        var s = Object.create(scope); s[as] = item;
        node.childNodes.forEach(function (c) { build(c, s, out); });
      });
      return;
    }
    if (tag === 'sc-if') {
      if (single(node.getAttribute('value'), scope)) node.childNodes.forEach(function (c) { build(c, scope, out); });
      return;
    }
    var el = document.createElement(tag);
    Array.prototype.forEach.call(node.attributes, function (a) {
      if (/^on[a-z]+$/i.test(a.name)) {
        var fn = single(a.value, scope);
        if (typeof fn === 'function') el.addEventListener(a.name.slice(2).toLowerCase(), fn);
        return;
      }
      if (a.name.indexOf('hint-') === 0) return;
      el.setAttribute(a.name, interpolate(a.value, scope));
    });
    node.childNodes.forEach(function (c) { build(c, scope, el); });
    out.appendChild(el);
  }

  function render() {
    var vals = instance && instance.renderVals ? instance.renderVals() : {};
    var frag = document.createDocumentFragment();
    template.childNodes.forEach(function (c) { build(c, vals, frag); });
    root.replaceChildren(frag);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var host = document.querySelector('x-dc');
    if (!host) return;
    var helmet = host.querySelector('helmet');
    if (helmet) Array.prototype.slice.call(helmet.children).forEach(function (c) { document.head.appendChild(c.cloneNode(true)); });
    // Keep the raw markup in an inert document to use as the template.
    var inert = document.implementation.createHTMLDocument('');
    inert.body.innerHTML = host.innerHTML;
    template = inert.body;
    host.replaceChildren();
    host.style.display = 'block';
    root = host;
    var code = document.querySelector('script[type="text/x-dc"]');
    if (code) {
      var Component = new Function('DCLogic', code.textContent + '\nreturn Component;')(DCLogic);
      instance = new Component({});
    }
    render();
  });
})();
