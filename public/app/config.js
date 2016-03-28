(function () {
    'use strict';

    var core = angular.module('app');


    var config = {
        appErrorPrefix: '[hot-towel Error] ',
        appTitle: 'hot-towel'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$translateProvider'];
    /* @ngInject */
    function configure($translateProvider) {

        var english = {
            "Title": "Internationalization Test",
            "Language": "Language",
            "Languages": {
                "English": "English",
                "French": "French",
                "Arabic": "عربى"
            },
            "Created_By": "Created by John Papa",
            "First_Name": "First Name",
            "Last_Name": "Last Name",
            "Age": "Age",
            "Location": "Location",
            "Messages": "Messages",
            "People": "People",
            "Splash_Msg": "Loading . . .",
            "Message_Count": "{messageCount, plural, =0{No Messages} one{1 Message} other{# Messages}}",
            "Conference_Date": "May 18 - 19, 2015",
            "Dashboard": "Dashboard",
            "Admin": "Admin",
            "Greeting": "{{name}} is logged in",
            "Admin_Message": "The quick brown fox jumped over the lazy dog",
            "Activation_Dash": "Activated Dashboard View",
            "Activation_Admin": "Activated Admin View",
            "Featured_Jobs": "Featured Jobs",
            "Welcome": "Welcome To Empower !",
            "Signin": "Signin",
            "New_Jobs": "New Jobs",
            "Jobs_Title": "Jobs Title",
            "Employer": {
                "EmployerName": "Employer Name",
                "EmployerType": "Employer Type",
                "NumberOfEmployees": "Number Of Employees",
                "AverageNumberOfJobOpeningsPerMonth": "Average Number Of Job Openings Per Month"
            },
            "Buttons": {
                "Update": "Update",
                "Save": "Save",
                "Cancel": "Cancel",
                "Delete": "Delete"
            },
            "Menu": {
                "SubTitle":"Jobs IN Egypt",
                "Home": "Home",
                "Jobs": "Jobs",
                "Employers": "Employers",
                "Vacancies": "Vacancies"
            },
            "Footer": {
                "Copy": "&copy; 2016 Empower Corp International Ltd."
            }
        };

        var arabic = {
            "Title": "أختبار ",
            "Language": "اللغات",
            "Languages": {
                "English": "English",
                "French": "French",
                "Arabic": "عربى"
            },
            "Created_By": "اضيف بواسطة",
            "First_Name": "الاسم الاول",
            "Last_Name": "الاسم الثانى",
            "Age": "العمر",
            "Location": "الموقع",
            "Messages": "الرسائل",
            "People": "الاشخاص",
            "Splash_Msg": "تحميل . . .",
            "Message_Count": "{messageCount, plural, =0{No Messages} one{1 Message} other{# Messages}}",
            "Conference_Date": "May 18 - 19, 2015",
            "Dashboard": "Dashboard",
            "Admin": "Admin",
            "Greeting": "{{name}} is logged in",
            "Admin_Message": "The quick brown fox jumped over the lazy dog",
            "Activation_Dash": "Activated Dashboard View",
            "Activation_Admin": "Activated Admin View",
            "Featured_Jobs": "الوظائف المفضلة",
            "Welcome": "مرحبا بكم فى Empower",
            "Signin": "تسجيل الدخول",
            "New_Jobs": "الوظائف الجديده",
            "Jobs_Title": "عنوان الوظيف",
            "Employer": {
                "EmployerName": "اسم الشركة",
                "EmployerType": "نوع الشركة",
                "NumberOfEmployees": "عدد الموظفين",
                "AverageNumberOfJobOpeningsPerMonth": "متوسط عدد الوظائف المفتوحة كل شهر"
            },
            "Buttons": {
                "Update": "تعديل",
                "Save": "حفظ",
                "Cancel": "الغاء",
                "Delete": "حذف"
            },
            "Menu": {
                "SubTitle":"وظائف فى مصر",
                "Home": "الرئيسية",
                "Jobs": "الوظائف",
                "Employers": "الشركات",
                "Vacancies": "فرص العمل"
            },
            "Footer": {
                "Copy": "&copy;"+" شركة ايم باور 2016"
            }
        };

        var french = {
            "Title": "أختبار ",
            "Language": "اللغات",
            "Languages": {
                "English": "English",
                "French": "Fr",
                "Arabic": "عربى"
            },
            "Created_By": "اضيف بواسطة",
            "First_Name": "الاسم الاول",
            "Last_Name": "الاسم الثانى",
            "Age": "العمر",
            "Location": "الموقع",
            "Messages": "الرسائل",
            "People": "الاشخاص",
            "Splash_Msg": "تحميل . . .",
            "Message_Count": "{messageCount, plural, =0{No Messages} one{1 Message} other{# Messages}}",
            "Conference_Date": "May 18 - 19, 2015",
            "Dashboard": "Dashboard",
            "Admin": "Admin",
            "Greeting": "{{name}} is logged in",
            "Admin_Message": "The quick brown fox jumped over the lazy dog",
            "Activation_Dash": "Activated Dashboard View",
            "Activation_Admin": "Activated Admin View",
            "Featured_Jobs": "الوظائف المفضلة",
            "Welcome": "مرحبا بكم فى Empower",
            "Signin": "تسجيل الدخول",
            "New_Jobs": " فرنساوى الوظائف الجديده"
            ,
            "Jobs_Title": "Jobs Title"
        };

        $translateProvider.translations('en', english);
        $translateProvider.translations('ar', arabic);
        $translateProvider.translations('fr', french);
        $translateProvider.registerAvailableLanguageKeys(['en', 'ar', 'fr'], {
            'en-US': 'en',
            'ar-EG': 'ar',
            'fr-FR': 'fr'
        });
        //$translateProvider.preferredLanguage('ar');
        $translateProvider.determinePreferredLanguage();
        console.log(navigator.language);


    }

    core.run(function ($rootScope) {
        $rootScope.$on('$translateChangeSuccess', function () {
            console.log('Translation Change Success!');
        });
        $rootScope.$on('$translateChangeError', function () {
            console.log('Translation Change Error!');
        });
    });

})();
