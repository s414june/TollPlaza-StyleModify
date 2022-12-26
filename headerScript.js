function afterGetHeader() {
    VerifyUser();
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    let dropdownAccountEl = document.querySelector('#account .dropdown-toggle');
    let dropdownAccount = new bootstrap.Dropdown(dropdownAccountEl);

    //預設menu開合(小裝置關)
    if ($(window).width() < 991) {
        collapseMenu();
        // $(dropdownAccountEl).attr("data-bs-toggle","");
    }
    $("#desktopMenuBtn").click((e) => {
        //如果在這裡阻止冒泡，會造成收合時按.menu-btn打不開，所以在打開狀態下才阻止冒泡
        if (!$("#menu").hasClass("collapsed")) {
            //會跟#menu-header的click事件同時發生而抵銷，因此阻止冒泡(阻止#menu-header的click事件)
            e.stopPropagation();
            collapseMenu();
        }
    })
    $("#menu-header").click((e) => {
        openCollapsedMenu();
    })
    $("#mobileMenu").click((e) => {
        $("#menu").hasClass("collapsed") ? openCollapsedMenu() : collapseMenu();
        $("#mobileMenu").toggleClass("collapsed");
    })
    $("#menu-header").mouseover((e) => {
        //單純UI效果
        if ($(window).width() > 576) {
            if ($("#menu").hasClass("collapsed")) {
                $("#menu").addClass("bigger");
                $(".menu-holder").addClass("bigger");
            }
        }
    })
    $("#menu-header").mouseout((e) => {
        //單純UI效果
        if ($(window).width() > 576) {
            $("#menu").removeClass("bigger");
            $(".menu-holder").removeClass("bigger");
        }
    })
    $(".not-opening-url").click((e) => {
        alert("此項目尚未啟用！");
    })

    $(window).resize(() => {
        dropdownAccount.hide();
        // if ($(window).width() < 991) {
        //     $(dropdownAccountEl).attr("data-bs-toggle","");
        // }
        // else {
        //     $(dropdownAccountEl).attr("data-bs-toggle","dropdown");
        // }
    })

    let accordionA = $(".accordion-item.no-arrow a");
    let isActive = false;
    accordionA.each((i,v)=>{
        let nowLoca = location.pathname.split("/").pop();
        if(!nowLoca.includes(".html")) nowLoca = location.pathname.split("/")[location.pathname.split("/").length - 2];
        if($(v).attr("href").includes(nowLoca)){
            $(v).parents(".accordion-item").addClass("active")
            isActive = true;
            return false;
        }
    })
    if(!isActive){
        accordionA.parent().find("[href='./index.html']").parents(".accordion-item").addClass("active")
    }

    // $("#system-main").append(`<div id="all-bg-image"></div>`);
}