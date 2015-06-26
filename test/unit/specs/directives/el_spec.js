var _ = require('../../../../src/util')
var Vue = require('../../../../src/vue')

if (_.inBrowser) {
  describe('v-el', function () {

    var el
    beforeEach(function () {
      el = document.createElement('div')
      spyOn(_, 'warn')
    })

    it('normal', function () {
      var vm = new Vue({
        el: el,
        template: '<div v-el="test" id="test"></div>'
      })
      expect(vm.$$.test).toBeTruthy()
      expect(vm.$$.test.id).toBe('test')
      vm._directives[0]._teardown()
      expect(vm.$$.test).toBeUndefined()
    })

    it('with v-repeat', function (done) {
      var vm = new Vue({
        el: el,
        data: { items: [1,2,3,4,5] },
        template: '<div v-repeat="items" v-el="test">{{$value}}</div>'
      })
      expect(vm.$$.test).toBeTruthy()
      expect(Array.isArray(vm.$$.test)).toBe(true)
      expect(vm.$$.test[0].textContent).toBe('1')
      expect(vm.$$.test[4].textContent).toBe('5')
      vm.items = []
      _.nextTick(function () {
        expect(vm.$$.test.length).toBe(0)
        done()
      })
    })

    it('with v-repeat pre-rendered', function (done) {
      var vm = new Vue({
        el: el,
        data: { items: [1,2,3,4,5] },
        template: '<div v-repeat-idx="0" v-el="test"><!--{{$value-->1<!--}}--></div>' +
          '<div v-repeat-idx="1" v-el="test"><!--{{$value-->2<!--}}--></div>' +
          '<div v-repeat-idx="2" v-el="test"><!--{{$value-->3<!--}}--></div>' +
          '<div v-repeat-idx="3" v-el="test"><!--{{$value-->4<!--}}--></div>' +
          '<div v-repeat-idx="4" v-repeat="items" v-el="test"><!--{{$value-->5<!--}}--></div>'
      })
      expect(vm.$$.test).toBeTruthy()
      expect(Array.isArray(vm.$$.test)).toBe(true)
      expect(vm.$$.test[0].textContent).toBe('1')
      expect(vm.$$.test[4].textContent).toBe('5')
      vm.items = []
      _.nextTick(function () {
        expect(vm.$$.test.length).toBe(0)
        done()
      })
    })

  })
}
