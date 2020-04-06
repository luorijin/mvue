import cls from './class'
function unScroll(){
    let elem = document.body;
    return {
        lock(){
            cls.addClass(elem,"vue-overflow")
        },
        unlock(){
            cls.removeClass(elem,"vue-overflow")
        }
    }
}
export default unScroll();