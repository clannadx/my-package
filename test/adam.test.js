const adam = require('../base')

describe('query',() => {
    test('hello = 123',() => {
        expect(adam.query('hello','?hello=test')).toBe('test')
    })
    test('hello = "" 空字符串',() => {
        expect(adam.query('hello','?hello=')).toBeNull
    })
    test('hello =',() => {
        expect(adam.query('hello','')).toBeNull
    })
})
describe('serialize',() => {
    test('{a:1,b:2}',() => {
        expect(adam.serialize({a:1,b:2})).toBe('a=1&b=2')
    })
    test('{a:"aaa",b:3,c:""}',() => {
        expect(adam.serialize({a:'aaa',b:3,c:''})).toBe('a=aaa&b=3&c=')
    })
    test('{a:"中文",b:3,c:""} 中文',() => {
        expect(adam.serialize({a:'中文',b:3,c:''})).toBe('a=%E4%B8%AD%E6%96%87&b=3&c=')
    })
    test('空对象',() => {
        expect(adam.serialize()).toBe('')
    })
})


describe('$',() => {
    test('$("#div")',() => {
        document.body.innerHTML = '<div id="div">123</div>'
        expect(adam.$('#div').innerHTML).toBe('123')
    })
})

describe('removeNode',() => {
    test('remove span', () => {
        document.body.innerHTML = '<div id="div"><span id="span">我是span</span></div>'
        const span = document.querySelector('#span')
        adam.removeNode(span)
        expect(document.querySelector('#span')).toBeNull
    })
})

describe('insertAfter',() => {
    test('insertAfter(node , target)', () => {
        document.body.innerHTML = '<div id="div"><p id="p"></p></div>'
        const p = document.querySelector('#p')
        const span = document.createElement('span')
        adam.insertAfter(span,p)
        expect(document.getElementsByTagName('span').length).toBe(1)
        expect(document.getElementById('div').lastElementChild).toBe(span)
    })
    test('insertAfter(node , target)', () => {
        document.body.innerHTML = '<div id="div"><p id="p"></p><p ></p></div>'
        const p = document.querySelector('#p')
        const span = document.createElement('span')
        adam.insertAfter(span,p)
        expect(document.getElementsByTagName('span').length).toBe(1)
        expect(document.getElementById('p').nextSibling).toBe(span)
    })
})



describe('addclassName', () => {
    test('addClass("js") 添加已有类名',() => {
        document.body.innerHTML = '<div id="div" class="js"></div>'
        adam.addClass('#div','js')
        expect(document.querySelector('#div').className).toBe('js')
        expect(adam.addClass('#div','js')).toBeNull
    })
    test('addClass("js01") 添加未有类名',() => {
        document.body.innerHTML = '<div id="div" class="js"></div>'
        adam.addClass('#div','js01')
        expect(document.querySelector('#div').className).toBe('js js01')
    })
})


describe('removeClass',() => {
    test('removeClass("js")',() => {
        document.body.innerHTML = '<div id="div" class="js aa"></div>'
        adam.removeClass('#div','js')
        expect(document.querySelector('#div').className).toBe('aa')
    })
    test('removeClass02',() => {
        document.body.innerHTML = '<div id="div" class="aa"></div>'
        adam.removeClass('#div','js')
        expect(document.querySelector('#div').className).toBe('aa')
        expect(adam.removeClass('#div','js')).toBeNull
    })
    test('removeClass03',() => {
        document.body.innerHTML = '<div id="div" class="aa"></div>'
        adam.removeClass('#div','aa')
        expect(document.querySelector('#div').className).toBe('')
    })
})


describe('getAbsoluteUrl',() => {
    test('getAbsoluteUrl(aa)',() => {
        const path = location.href
        expect(adam.getAbsoluteUrl('/aaa')).toBe(path + 'aaa')
    })
})
describe('debounce', () => {
    test('累加结果', (done) => {
        var total = 0
        const debounce = adam.debounce(() => {
            total += 1
            expect(total).toBe(1)
            done()
        }, 300)

        for (let i = 0; i < 10; i++) {
            debounce()
        }

        expect(total).toBe(0) //调用十次 debounce 检测total
    })
    test('累加结果 没有默认时间', (done) => {
        var total = 0
        const debounce = adam.debounce(() => {
            total += 1
            expect(total).toBe(1)
            done()
        })

        for (let i = 0; i < 10; i++) {
            debounce()
        }

        expect(total).toBe(0) //调用十次 debounce 检测total
    })
})


describe('removeItemByIndex',() => {
    test('0,[1,2,3]', () => {
        expect(adam.removeItemByIndex(0,[1,2,3])).toEqual([2,3])
    })
    test('1,[1,2,3]',() => {
        expect(adam.removeItemByIndex(1,[1,2,3])).toEqual([1,3])
    })
    test('null,[1,2,3]',() => {
        expect(adam.removeItemByIndex(null,[1,2,3])).toBeUndefined()
    })
    test('5,[1,2,3] 超过数组长度',() => {
        expect(adam.removeItemByIndex(5,[1,2,3])).toBeNull()
    })
    test('1,{}非数组', () => {
        expect(adam.removeItemByIndex(1,{})).toEqual({})
    })
    test('-1, [1,2,3] 负数', () => {
        expect(adam.removeItemByIndex(-1,[1,2,3])).toEqual([1,2])
    })
})


describe('arrUnique',() => {
    test('[1,2,2,3]',() => {
        expect(adam.arrUique([1,2,2,3])).toEqual([1,2,3])
    })
    test('空',() => {
        expect(adam.arrUique()).toBeNull
    })
})

describe('arrMax', () => {
    test('[1,2,3]',() => {
        expect(adam.arrMax([1,2,3])).toBe(3)
    })
    test('空',() => {
        expect(adam.arrMax()).toBeNull
    })
})

describe('arrMin', () => {
    test('[1,2,3]',() => {
        expect(adam.arrMin([1,2,3])).toBe(1)
    })
    test('空',() => {
        expect(adam.arrMin()).toBeNull
    })
})


describe('isObject',() => {
    test('{a:1} 对象',() => {
        expect(adam.isObject({a:1})).toBeTruthy
    })
    test('[1,2] 数组',() => {
        expect(adam.isObject([1,2])).toBeFalsy
    })
    test('"12aaa"字符串',() => {
        expect(adam.isObject('12aaa')).toBeFalsy
    })
    test('true 布尔',() => {
        expect(adam.isObject(true)).toBeFalsy
    })
    test('Null 空',() => {
        expect(adam.isObject(null)).toBeFalsy
    })
    test('undefined undefined',() => {
        expect(adam.isObject(undefined)).toBeFalsy
    })
    test('没有值',() => {
        expect(adam.isObject()).toBeNull
    })
})


describe('stringTime',() => {
    test('空字符串',() => {
        expect(adam.stringTime()).toBeNull
    })
    test('aaasa字母个数',() => {
        expect(adam.stringTime('aaasa')).toEqual({a:4,s:1})
    })
})


describe('randomNum',() => {
    test('2-32的10个随机整数',() => {
        const arr = adam.randomNum(10,2,32)
        expect(arr.length).toBe(10)
        expect(Math.max.apply(this,arr)).toBeLessThanOrEqual(34)
        expect(Math.min.apply(this,arr)).toBeGreaterThanOrEqual(2)
    })
    test('空',() => {
        expect(adam.randomNum()).toBeNull
    })
})
