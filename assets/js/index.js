$(function () {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        //提示用户是否退出
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            layer.close(index);
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data);
        },
        // complete: function (res) {
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }

    })
}
// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
    // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.按需求渲染用户头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-immg').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}