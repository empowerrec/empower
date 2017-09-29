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
            'Title': 'Internationalization Test',
            "Language": "Language",
            "Languages": {
                "English": "English",
                "French": "French",
                "Arabic": "عربى"
            },
            "Created_By": "Created by John Papa",
            "Forget Password": "Forget Password",
            "HearAboutUs": "How did you hear about Us",
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
            "Signin": "Sign In",
            "New_Jobs": "New Jobs",
            'Jobs_Title': "Jobs Title",
            "FacebookSignin": "Facebook SignUp/Login",
            "GoogleSignin": "Google SignUp/Login",
            "Agreement": "I agree with the Terms of use",
            "Employer": {
                "Employer": "Employer",
                "EmployerName": "Name",
                "EmployerType": "Type",
                "NumberOfEmployees": "Employees",
                "AverageNumberOfJobOpeningsPerMonth": "Jobs Per Month",
                "ContactFirstName": "Contact First Name",
                "ContactLastName": "Contact Last Name",
                "ContactTitle": "Contact Title",
                "ContactMobileNumber": "Contact Mobile Number",
                "ContactPersonInformation": "Contact Person Information",
                "CompanyPhone": "Company Phone",
                "CompanyWebsite": "Company Website",
                "CompanySize": "Company Size",
                "Country": "Country",
                "Photo": "Photo",
                "CompanyProfile":"Company Profile"

            },
            "JobSeeker": {
                "JobSeeker": "JobSeeker",
                "Gender": "Gender",
                "BirthDate": "Date of Birth",
                "Address": "Address",
                "ResumeLink": "Resume Link",
                "ExperienceLevel": "Experience Years",
                "MostRecentEmployer": "Most Recent Employer",
                "MostRecentJobTitle": "Most Recent Job Title",
                "JobCategory": "JobCategory",
                "PreferredJobCategory": "PreferredJobCategory",
                "EducationLevel": "Education Level",
                "SchoolName": "School Name",
                "Religion": "Religion",
                "Nationality": "Nationality",
                "SecondNationality": "Second Nationality",
                "GraduationGrade": "GraduationGrade",
                "LanguageSpoken": "Language Spoken",
                "SalaryPreference": "Minimum Net Monthly Salary ",
                "PreferredWork": "PreferredWork",
                "Reference1": "Reference1",
                "Reference1Contact": "Reference1 Contact",
                "Reference2": "Reference2",
                "Reference2Contact": "Reference2 Contact",
                'Personal Information': 'Personal Information',
                'PersonalInformationDescrption': '(Tell us a few things about yourself)',
                'Educational Information': 'Education',
                'Educational InformationDescrption': 'Profile Education',
                'Contact Information': 'Contact Information',
                'Contact InformationDescrption': 'Contact Information',
                "Country": "Country",
                "MobileNo": "Mobile Number",
                "ContactVia": "I prefer to be contacted via",
                "HomePhoneNo": "Home Phone Number",
                "Email": "Email Address",
                "Experiances": "Experiances",
                "ExperiancesDescrption": "Profile Experience",
                "ProfessionalCertifications": "Professional Certifications",
                "ProfessionalCertificationsDescrption": "Professional Certifications <br/> Here you can list your professional certifications and licenses, from your commercial pilot’s license to your Six Sigma certification.",
                "MembershipsAndAwards": "Memberships And Awards",
                "Interests": "Interests",
                'FirstName': 'First Name',
                'MiddleName': 'Middle Name',
                'LastName': 'Last Name',
                'FullName': 'Full Name',
                'MaritalStatus': 'Marital Status',
                'MilitaryStatus': 'Military Status',
                'CarLicenceType': 'Do you have a valid Driving License',
                'VisaStatus': 'Visa Status',
                'DrivingLicenseIssuedIn': 'Driving license issued in /if Applicable',
                'FacebookAcount': 'Facebook (optional)',
                'TwitterAcount': 'Twitter (optional)',
                'LinkedinAccount': 'LinkedIn (optional)',
                'Course': ' Professional Course',
                'CourseDescrption': ' Profile Course',
                'Skills': 'Skills',
                'SkillsDecrption': 'Profile Skills <br/>This is your place to highlight special skills like proficiency in Photoshop or project management.',
                'LanguageSkills': 'Language Skills',
                'LanguageSkillsDecrption': 'Language Skills',
                'ProfessionalOverviewDescrption': 'Profile Professional Overview',
                'ProfessionalOverview': 'Professional Overview',
                'ProfessionalOverviewCareerLevel': 'Experience Level / Seniority',
                'ProfessionalOverviewTotalYearsOfExperianceDescrption': 'e.g. "Electrical engineer with 5 years of professional experience in the field of Switching stations installation"',
                'ProfessionalOverviewTotalYearsOfExperiance': 'Total years of experience',
                'ProfessionalOverviewSummary': 'Summary',
                'ProfessionalOverviewSummaryDescrption': 'Tip: For established professionals, we recommend summarizing the experience and established skills you have to build upon. If you’re newer to the professional world, try positioning it as an objective statement to let prospective employers know where you see your career heading next.',
                'HasACar': 'Do you have a car',
                'PeriodOfEnrollment': 'Period Of Enrollment',
                'MoreInformation': 'More Information',
                'Job Preferences': 'Job Preferences',
                'JobPreferencesDescrption': 'Job Preferences',
                'PreferredJobLevel': 'Preferred Job Level',
                'PreferredJobTitle': 'Preferred Job Title',
                'FirstPreferredIndustry': '1st Preferred Industry ',
                'SecondPreferredIndustry': '2nd Preferred Industry ',
                'ThirdPreferredIndustry': '3rd Preferred Industry ',
                'FirstPreferredLocation': '1st Preferred Location',
                'SecondPreferredLocation': '2nd Preferred Location',
                'ThirdPreferredLocation': '3rd Preferred Location',
                'TravelPreference': 'Travel Preference',
                'EmploymentType': 'Employment Type',
                'References': 'References',
                'ReferencesDescrption': 'Add a new reference (Preferably former employers)',
                'ReferenceFullName': 'Full Name',
                'ReferencePosition': 'Position',
                'ReferenceCompany': 'Company',
                'ReferenceEmailAddress': 'Email Address',
                'ReferencePhoneNumber': 'Travel Preference',
                'ReferenceRelationship': 'Relationship with you (Current/previous)',
                "LanguageSkill": "Language Skills",
                "Photo": "Photo",
                "CV": "Upload CV",
                "CVLink": "CV File",
                "PhotoDescrption": "Profile Photo",
                "CVDescrption": "You may upload and attach your own CV along with your Empower CV. However, to be able to apply to jobs, you must complete your Empower CV.",
                "EmailPreference": "Email Preference",


            },
            "Vacancy": {
                "Vacancy": "Vacancy",
                "JobTitle": "Job Title",
                "JobDescrption": "Job Descrption",
                "AvailableFrom": "Available From",
                "AvailableTo": "Available To",
                "SalaryRangeFrom": "Salary From",
                "SalaryRangeTo": "To",
                "SalaryCurancy": "Curancy",
                "RequiredExperianceFrom": "Required Experience From",
                "RequiredExperianceTo": "Required Experience To",
                "JobType": "Job Type",
                "Industry": "Industry",
                "Country": "Country",
                "City": "City",
                'EducationalLevel': 'Educational Level',
                'CareerLevel': 'Career Level',
                'HotJobFlag': 'Hot Job Flag',
                'Area': 'Area',
                'JobRole': 'Job Role',
                'JobRequirements': 'Requirements',
                'Benfits': 'Benfits',
                'HideSalary': 'Hide Salary',
                'ReciveApplicationsByEmail': 'Recive Applications By Email',
                'HideCompany': 'Hide Company',
                'SendRecommendedCandidatesDaily': 'Send Recommended Candidates Daily',
                'SendRecommendedCandidatesWeekly': 'Send Recommended Candidates Weekly'

            },
            'City': {
                "City": "City",
                "Name": "Name",
                "Country": "Country",
                "Confirmed": "Confirmed"
            },
            'Area': {
                "Area": "Area",
                "City": "City",
                "Name": "Name",
                "Confirmed": "Confirmed"
            },
            "User": {
                "UserName": "User Name",
                "FirstName": "First Name",
                "LastName": "Last Name",
                "UserType": "User Type",
                "CreatedBy": "Created By",
                "ModifiedBy": "Modified By",
                "Package": "Package",
                'Features': 'Features'
            },
            "Industry": {
                "Name": "Name"
            },
            "Specialization": {
                "Name": "Name"
            },
            "Faculty": {
                "Name": "Name"
            },
            "Univirstynivirsty": {
                "Name": "Name"
            },
            "JobType": {
                "Name": "Name"
            },
            "JobRole": {
                "Name": "Name"
            },
            "Address": {
                "Country": "Country",
                "City": "City",
                "Area": "Area",
                "AddressLine1": "Address Line1",
                "AddressLine2": "Address Line2"
            },
            "ProfessionalCertification": {
                "CertificationName": "Certification Name",
                "InstitutionName": "Institution Name",
                "DateIssued": "Date Issued",
                "CountryOfExamination": "Country Of Examination",
                "OverallGradeGPA": "Overall Grade / GPA",
                "Summary": "Summary (optional)"
            },
            "MembershipAndAward": {
                "Membership": "Membership",
                "HonorAndAward": "Honor & Award"
            },
            "Interest": {
                "Interest": "Interest"
            },   
            "Experiance": {
                "Country": "Country (Work Place)",
                "City": "City/location (Work Place)",
                "Company": "Company Name",
                "CompanySize": "Company Size",
                "CompanyType": "Industry Type",
                "Position": "Position",
                "CompanyWebsite": "Company Website",
                "JobRole": "Job Category",
                "ReportTo": "Position of your direct manager / the person you report to",
                "TransportAllowance": "Transport Allowance",
                "HousingAllowance": "Housing Allowance",
                "OtherAllowance": "Other Allowance",
                "Salary": "current net salary",
                "PeriodFrom": "Period From",
                "PeriodTo": "Period To",
                "Achievements": "Main Achievements / Tasks / Job Description",
                "FunctionalTasks": "Functional Tasks"
            },
            "LanguageSkill": {
                "Language": "Native Language",
                "LanguageLevel": "LanguageLevel"

            },
            "Skill": {
                "SkillType": "Title",
                "SkillLevel": "SkillLevel"
            },
            "Category": {
                "Description": "Description"
            },
            "InnerPage": {
                "PageTitle": "Page Title",
                "PageBody": "Page Body"
            },
            "EducationalInformation": {
                'EducationalLevel': 'Educational Level',
                'Univirsty': 'Univirsty',
                'Faculty': 'Field of Study/Faculty',
                'Specialization': 'Major',
                'Grade': 'Grade / GPA',
                'GraduationYear': 'Graduation Date',
                'StartYear': 'Start Date',
                'Country': 'Country',
                'City': 'City',
                'Description': 'Description (optional)',
                'Skills': 'Skills (optional)'
            }, "EducationalLevel": {
                "Name": "Name"
            }, "Nationality": {
                "Name": "Name"
            },
            'Course': {
                'Title': 'Course Name',
                'TrainingCenter': 'Institution Name',
                'Specialization': 'Specialization',
                'Grade': 'Grade',
                'CourseYear': 'Date Issued',
                'Summary': 'Summary (optional)'
            },
            'Main': {
                'Empower': 'Empower',
                'Welcome': 'Welcome to the Empower!',
                'Search1': 'FIND THE BEST',
                'Search2': 'JOBS IN EGYPT',
                'Search3': 'Search Jobs (e.g. Sales in Cairo)',
                'Messge1': '1.Register an account to start',
                'Messge2': '2. Specify & search your desired job',
                'Messge3': '3. Send your resume to employers'
            },
            "Buttons": {
                "ArrangeInterview": "Arrange Interview",
                "Update": "Update",
                "Save": "Save",
                "Cancel": "Cancel",
                "Delete": "Delete",
                "Add": "Add New",
                "Select": "Select",
                "Apply": "Apply",
                "Search": "Search",
                "NewAddress": "New Address",
                "Change Password": "Change Password",
                "Reset Password": "Reset Password",
                'Previous': 'Previous',
                'Next': 'Next',
                'First': 'First',
                'Last': 'Last',
                'Finish': 'Finish',
                "Accept": "Accept",
                "Reject": "Decline",
                "Rollback": "Rollback",
                "ShortList": "ShortList",
                "OK": "OK",
                "Approve": "Approve"
            },
            "Menu": {
                "SubTitle": "Jobs IN Egypt",
                "Home": "Home",
                "Jobs": "Jobs",
                "Employers": "Employers",
                "Vacancies": "Vacancies",
                "ContactUs": "Contact US",
                "AboutUs": "About US",
                "MyProfile": "User Profile",
                "SearchJobs": "Search Jobs",
                "Users": "Users",
                "Industries": "Industries",
                "JobTypes": "Job Types",
                "JobRoles": "Job Roles",
                "InnerPages": "Inner Pages",
                "JobSeekers": "Job Seekers",
                "Signout": "Sign Out",
                "PostJob": "Post Job",
                "UserMenu": "User Menu",
                "EducationalLevels": "Educational Levels",
                "Nationality": "Nationality",
                "Categories": "Categories",
                "CompanyProfile": "Company Profile",
                "InviteSubUser": "Invite Sub User",
                "SignUpSubUser": "SignUpSubUser",
                "subUserFeatures": "SubUserFeatures",
                "subUsers": "SubUsers",
                "Experiances": "Experiances",
                "ProfessionalCertifications": "Professional Certifications",
                "MembershipsAndAwards": "Memberships & Awards",
                "MembershipsAndAwardsDescrption": "Profile Memberships & Awards",
                "Interests": "Interests",
                "InterestsDescrption": "Interests",
                'SelectValue': 'Select Value',
                'JobSeekerProfile': 'Job Seeker Profile',
                'Cities': 'Cities',
                'CitiesNotConfirmed': 'Cities Not Confirmed',
                'Areas': 'Areas',
                'AreasNotConfirmed': 'Areas Not Confirmed',
                'Specializations': 'Specializations',
                'Faculties': 'Faculties',
                'Univirsties': 'Univirsties',
                'UnivirstiesNotConfirmed': 'Univirsties Not Confirmed',
                'Applicants': 'Applicants',
                'Login': 'Login',
                'Register': 'Register ',
                'Packages': 'Packages',
                'Features': 'Features',
                'Candidates': 'Candidates'

            },
            "Footer": {
                "Copy": " \u00A9 2016 Empower Corp International Ltd."
            },
            "AccordionHeader": {
                'Location': 'Location',
                'Country': 'Country',
                'City': 'City',
                'Area': 'Area',
                'JobClassification': 'Job Classification',
                'Industry': 'Industry',
                'JobRole': 'Job Role',
                'JobType': 'Job Type',
                'JobDetails': 'Job Details',
                'EducationalLevel': 'Educational Level',
                'CareerLevel': 'Career Level',
                'Dates': 'Dates',
                'BirthDate': 'Birth Date'
            },
            'Package': {
                "Name": "Name",
                "Type": "Type",
                "Features": "Features",
                "Costs": "Costs"
            },
            'Feature': {
                "Name": "Name",
                "Code": "Code",
                "Type": "Type"
            },
            'PackageFeature': {
                "Points": "Points",
                "Feature": "Feature"
            },
            'PackageCost': {
                "PeriodFromByMonth": "Period From By Month",
                "PeriodToByMonth": "Period To By Month",
                "CostPerMonth": "Cost Per Month"
            },
            'UserPackage': {
                "NoOfMonths": "No Of Months",
                "Discount": "Discount",
                "TotalAmount": "Total Amount",
                "PackageAmount": "Package Amount",
                "StartDate": "Start Date",
                "ExpiryDate": "Expiry Date",
                "Package": "Package"
            },
            'UserFeature': {
                "Points": "Points",
                "DistrbuitedForSubUsers": "Distrbuited For Sub Users",
                "UsedFromPoints": "Used From Points",
                "Package": "Package",
                "Feature": "Feature",
                "ExpiryDate": "Expiry Date",
                "User": "User"
            },
            'Applicant': {
                "ArrangeInterviewLocation": "Interview Location",
                "ArrangeInterviewDate": "Interview Date",
                "ArrangeInterviewTime": "Interview Time"
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
            "Email": "البريد الالكتروني",
            "Password": "كلمة السر",
            "HearAboutUs": "كيف سمعت عنا",
            "Remember Me": "تذكرني",
            "Forget Password": "نسيت كلمة السر",
            "Confirm Password": "تاكيد كلمة السر",
            "Sign Up": "فتح حساب",
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
            "FacebookSignin": "تسجيل الدخول عن طريق الفيس بوك",
            "GoogleSignin": "تسجيل الدخول عن طريق جوجل",
            "Agreement": "أوافق على الشروط والأحكام",
            "Employer": {
                "Employer": "معلن عن وظيفة",
                "EmployerName": "اسم الشركة",
                "EmployerType": "نوع الشركة",
                "NumberOfEmployees": "عدد الموظفين",
                "AverageNumberOfJobOpeningsPerMonth": " عدد الوظائف شهريا",
                "ContactFirstName": "الاسم الأول",
                "ContactLastName": "الاسم الأخير",
                "ContactTitle": "الوظيفة",
                "ContactMobileNumber": "رقم التليفون",
                "ContactPersonInformation": "بيانات المسئول",
                "CompanyPhone": "تليفون الشركة",
                "CompanyWebsite": "الموقع الاليكترونى",
                "CompanySize": "عدد الموظفين",
                "Country": "الدولة",
                "Photo": "الصورة"
            },
            "JobSeeker": {
                "JobSeeker": "باحث عن وظيفة",
                "Gender": "النوع",
                "BirthDate": "تاريخ الميلاد",
                "Address": "العنوان",
                "ResumeLink": "السيرة الذاتية",
                "ExperienceLevel": "سنوات الخبرة",
                "MostRecentEmployer": "الشركة الحالية",
                "MostRecentJobTitle": "المسمي الوظيفي الحالي",
                "JobCategory": "فئة الوظيفة",
                "PreferredJobCategory": "فئة الوظيفة المفضلة",
                "EducationLevel": "مستوي التعليم",
                "SchoolName": "اسم المدرسة او الجامعة",
                "GraduationGrade": "درجة التخرج",
                "Nationality": "الجنسية",
                "SecondNationality": "الجنسية الثانية (إن وجدت)",
                "LanguageSpoken": "اللغات",
                "SalaryPreference": "المرتب المفضل",
                "PreferredWork": "نوع العمل",
                "Religion": "الديانة",
                "Reference1": "Reference1",
                "Reference1Contact": "Reference1 Contact",
                "Reference2": "Reference2",
                "Reference2Contact": "Reference2 Contact",
                'Personal Information': 'المعلومات الشخصية',
                'Educational Information': 'المعلومات الدراسية',
                'Contact Information': 'معلومات الاتصال',
                "MobileNo": "رقم المحمول",
                "HomePhoneNo": "رقم تليفون المنزل",
                "ContactVia": "انا افضل الاتصال بي عبر",
                "Email": "البريد الألكتروني",
                "Experiances": "الخبرات",
                "ProfessionalCertifications": "الشهادات المهنية",
                "MembershipsAndAwards": "العضويات والجوائز",
                "Interests": "الإهتمامات",
                'FirstName': 'الاسم الاول',
                'MiddleName': 'الاسم الاوسط',
                'LastName': 'الاسم الاخير',
                'FullName': 'الاسم',
                'MaritalStatus': 'الحالة الاجتماعية',
                'MilitaryStatus': 'موقف من التجنيد',
                'CarLicenceType': 'نوع رخصة السيارة',
                'VisaStatus': 'حالة الفيزا',
                'DrivingLicenseIssuedIn': 'رخصة القيادة الصادرة في / إذا وجدت',
                'FacebookAcount': 'حساب الفيسبوك',
                'TwitterAcount': 'حساب التويتر',
                'LinkedinAccount': 'حساب لينكدان',
                'Course': 'الدورات',
                'Skills': 'المهارات',
                'LanguageSkills': 'مهارات اللغة',
                'HasACar': 'لديك سيارة',
                'PeriodOfEnrollment': 'مهلة ترك الشركة الحالية',
                'MoreInformation': 'معلومات اضافية',
                'Job Preferences': 'خيارات الوظيفة',
                'PreferredJobLevel': 'Preferred Job Level',
                'PreferredJobTitle': 'Preferred Job Title',
                'FirstPreferredIndustry': '1st Preferred Industry ',
                'SecondPreferredIndustry': '2nd Preferred Industry ',
                'ThirdPreferredIndustry': '3rd Preferred Industry ',
                'FirstPreferredLocation': '1st Preferred Location',
                'SecondPreferredLocation': '2nd Preferred Location',
                'ThirdPreferredLocation': '3rd Preferred Location',
                'TravelPreference': 'Travel Preference',
                'EmploymentType': 'Employment Type'
            },
            'City': {
                "City": "المدينة",
                "Name": "الاسم",
                "Country": "البلد",
                "Confirmed": "تاكيد"
            },
            'Area': {
                "Area": "المنطقة",
                "City": "المدينة",
                "Name": "الاسم",
                "Confirmed": "تاكيد"
            },
            "Vacancy": {
                "Vacancy": "فرصة عمل",
                "JobTitle": "عنوان الوظيفة",
                "JobDescrption": "وصف الوظيفة",
                "AvailableFrom": "متاحة من",
                "AvailableTo": "متاحة الى",
                "SalaryRangeFrom": "المرتب من ",
                "SalaryRangeTo": " الى",
                "SalaryCurancy": "عملة المرتب",
                "RequiredExperiance": "الخبرة المطلوبة",
                "JobType": "نوع الوظيفة",
                "JobRole": "مجال الوظيفة",
                "Industry": "قطاع العمل",
                "Country": "الدولة",
                "City": "المدينة",
                'EducationalLevel': 'مستوي التعليم',
                'CareerLevel': 'مستوي الوظيفة',
                'HotJobFlag': 'وظيفة مهمة',
                'Area': 'المنطقة',
                'NoData': 'لا يوجد وظائف للعرض',
                'JobRequirements': 'المتطلبات',
                'Benfits': 'المزايا',
                'HideSalary': 'اخفاءالمرتب',
                'ReciveApplicationsByEmail': 'استلام الطلبات عن طريق الايميل',
                'HideCompany': 'اخفاء بيانات الشركة',
                'SendRecommendedCandidatesDailyOrWeekly': 'ارسال المرشحين يوميا أو اسبوعيا'
            },
            "LanguageSkill": {
                "Language": "اللغة",
                "LanguageLevel": "مستوى اللغة"

            },
            "Skill": {
                "SkillType": "نوع المهارة",
                "SkillLevel": "مستوى المهارة"
            },
            "User": {
                "UserName": "اسم المستخدم",
                "FirstName": "الاسم الأول",
                "LastName": "الاسم الأخير",
                "UserType": "نوع المستخدم",
                "CreatedBy": "سجل بواسطة",
                "ModifiedBy": "عدل بواسطة",
                "Package": "الحزمة",
                'Features': 'الخواص'
            },
            "Industry": {
                "Name": "الأسم"
            },
            "Specialization": {
                "Name": "الأسم"
            },
            "Faculty": {
                "Name": "الأسم"
            },
            "Univirstynivirsty": {
                "Name": "الأسم"
            },
            "JobType": {
                "Name": "نوع الوظيفة"
            },
            "JobRole": {
                "Name": "نوع المجال"
            },
            "Address": {
                "Country": "دولة",
                "City": "مدينة",
                "Area": "منطقة",
                "AddressLine1": "العنوان الأول",
                "AddressLine2": "العنوان الثاني"
            },
            "ProfessionalCertification": {
                "CertificationName": "اسم الشهادة",
                "InstitutionName": "اسم المعهد",
                "DateIssued": "تاريخ الإصدار",
                "CountryOfExamination": "بلد الاختبار",
                "OverallGradeGPA": "الصف العام / المعدل التراكمي",
                "Summary": "ملخص (اختياري)"
            },
            "MembershipAndAward": {
                "Membership": "العضويه",
                "HonorAndAward": "التكريم والمكافاة"
            },
            "Interest": {
                "Interest": "الاهتمام"
            },
            "Experiance": {
                "Country": "الدولة",
                "City": "المدينة",
                "Company": "الشركة",
                "CompanySize": "حجم الشركة",
                "CompanyType": "نوع الشركة",
                "Position": "الوظيفة",
                "CompanyWebsite": "موقع الشركة",
                "JobRole": "مجال الوظيفة",
                "ReportTo": "وظيفة مديرك المباشر / الشخص الذي ترفع تقاريرك له",
                "Salary": "المرتب",
                "TransportAllowance": "بدل النقل",
                "HousingAllowance": "بدل سكن",
                "OtherAllowance": "بدلات أخرى",
                "PeriodFrom": "الفتره من ",
                "PeriodTo": "الفتره الى",
                "Achievements": "الانجازات",
                "FunctionalTasks": "المهام"
            },
            "Category": {
                "Name": "الأسم"
            },
            "InnerPage": {
                "PageTitle": "عنوان الصفحة",
                "PageBody": "تفاصيل الصفحة"
            },
            'EducationalInformation': {
                'Educational Level': 'المرحلة التعليمية',
                'Univirsty': 'الجامعة',
                'Faculty': 'الكلية',
                'Specialization': 'التخصص',
                'Grade': 'التقدير',
                'GraduationYear': 'تاريخ التخرج',
                'StartYear': 'تاريخ البدء',
                'Country': 'البلد',
                'City': 'المدينة',
                'Description': 'الوصف (اختياري)',
                'Skills': 'المهارات (اختياري)'
            }, 'EducationalLevel': {
                "Name": "الأسم"
            }, 'Nationality': {
                "Name": "الأسم"
            },
            'Course': {
                'Title': 'اسم الدورة',
                'TrainingCenter': 'مركز التدريب',
                'Specialization': 'التخصص',
                'Grade': 'التقدير',
                'CourseYear': 'السنة',
                'Summary': 'الملخص (اختياري)'
            },
            'Main': {
                'Empower': 'ايم باور',
                'Welcome': 'مرحبا بكم فى الموقع',
                'Search1': 'ابحث عن أفضل',
                'Search2': 'الوظائف فى مصر',
                'Search3': 'بحث عن وظائف مثلا مبيعات القاهرة',
                'Messge1': '1- تسجيل مستخدم جديد',
                'Messge2': '2. ابحث عن وظيفتك المفضله',
                'Messge3': '3. ارسل بياناتك للشركات'
            },
            "Buttons": {
                "ArrangeInterview": "تنظيم مقابلة",
                "Update": "تعديل",
                "Save": "حفظ",
                "Cancel": "الغاء",
                "Delete": "حذف",
                "Add": "اضافة جديد",
                "Select": "اختر",
                "Apply": "التقدم للوظيفة",
                "Search": "بحث",
                "NewAddress": "عنوان جديد",
                "Change Password": "تغيير كلمة السر",
                "Reset Password": "ارسال ميل",
                'Previous': 'السابق',
                'Next': 'التالي',
                'First': 'الاول',
                'Last': 'الاخير',
                'Finish': 'تم',
                "Accept": "موافق",
                "Reject": "رفض",
                "Rollback": "رجوع",
                "ShortList": "قائمة مختصره",
                "OK": "تمام",
                "Approve": "مقبول"
            },
            "Menu": {
                "SubTitle": "وظائف فى مصر",
                "Home": "الرئيسية",
                "Jobs": "الوظائف",
                "Employers": "الشركات",
                "Vacancies": "فرص العمل",
                "ContactUs": "اتصل بنا",
                "AboutUs": "عنا",
                "MyProfile": "بيانات المستخدم",
                "SearchJobs": "بحث في الوظائف",
                "Users": "المستخدمين",
                "Industries": "قطاعات العمل",
                "JobTypes": "انواع الوظائف",
                "JobRoles": "مجالات الوظائف",
                "InnerPages": "الصفحات الداخلية",
                "JobSeekers": "الباحثين عن العمل",
                "Signout": "تسجيل الخروج",
                "PostJob": "أعلن عن وظيفة",
                "UserMenu": "قائمة المستخدم",
                "EducationalLevels": "المستويات التعليمية",
                "Nationality": "الجنسية",
                "Categories": "التصنيفات",
                "CompanyProfile": "بيانات الشركة",
                "InviteSubUser": "دعوة المستخدمين",
                "SignUpSubUser": "SignUpSubUser",
                "subUserFeatures": "SubUserFeatures",
                "subUsers": "SubUsers",
                "Experiances": "الخبرات",
                "ProfessionalCertifications": "الشهادات المهنية",
                "MembershipsAndAwards": "العضويات والجوائز",
                "Interests": "الإهتمامات",
                'SelectValue': 'اختار من القائمة',
                'JobSeekerProfile': 'بيانات طالب العمل',
                'Cities': 'المدن',
                'Areas': 'المناطق',
                'Specializations': 'التخصصات',
                'Faculties': 'الكليات',
                'Univirsties': 'الجامعات',
                'CitiesNotConfirmed': 'المدن التي لم يتم تاكيدها',
                'AreassNotConfirmed': 'المناطق التي لم يتم تاكيدها',
                'UnivirstiesNotConfirmed': 'الجامعات التي لم يتم تاكيدها',
                'Applicants': 'متقدم لوظيفه',
                'Login': 'تسجيل الدخول',
                'Register': 'تسجيل ',
                'Features': 'الخواص',
                'Packages': 'الحزم',
                'Candidates': 'المرشحين'

            },
            "Footer": {
                "Copy": "\u00A9" + " شركة ايم باور 2016"
            },
            "AccordionHeader": {
                'Location': 'الموقع',
                'Country': 'البلد',
                'City': 'المدينة',
                'Area': 'المنطقة',
                'JobClassification': 'تصنيف الوظائف',
                'Industry': 'صناعة',
                'JobRole': 'الدور الوظيفي',
                'JobType': 'نوع الوظيفة',
                'JobDetails': 'تفاصيل الوظيفة',
                'EducationalLevel': 'المستوى التعليمي',
                'CareerLevel': 'المستوى الوظيفي',
                'Dates': 'التواريخ',
                'BirthDate': 'تاريخ الميلاد'
            },
            'Package': {
                "Name": "الأسم",
                "Type": "النوع",
                "Features": "الخواص",
                "Costs": "القيم"
            },
            'Feature': {
                "Name": "الأسم",
                "Code": "Code",
                "Type": "النوع"
            },
            'PackageFeature': {
                "Points": "النقاط",
                "Feature": "الخاصية"
            },
            'PackageCost': {
                "PeriodFromByMonth": "بداية الفترة بالشهورر",
                "PeriodToByMonth": "نهاية الفترة بالشهور",
                "CostPerMonth": "القيمة الشهر"
            },
            'UserPackage': {
                "NoOfMonths": "عدد الاشهر",
                "Discount": "الخصم",
                "TotalAmount": "القيمة الكلية",
                "PackageAmount": "قيمة الحزمة",
                "StartDate": "تاريخ البداية",
                "ExpiryDate": "تاريخ النهاية",
                "Package": "الحزمة"
            },
            'UserFeature': {
                "Points": "النقاط",
                "DistrbuitedForSubUsers": "الموزع علي المستخدمين التابعين",
                "UsedFromPoints": "المستخدم من النقاط",
                "Package": "الحزمة",
                "Feature": "الخاصية",
                "ExpiryDate": "تاريخ النهاية",
                "User": "المستخدم"
            },
            'Applicant': {
                "ArrangeInterviewLocation": "مكان المقابلة",
                "ArrangeInterviewDate": "تاريخ المقابلة",
                "ArrangeInterviewTime": "وقت المقابلة"
            }
        };



        $translateProvider.translations('en', english);
        $translateProvider.translations('ar', arabic);

        $translateProvider.registerAvailableLanguageKeys(['en', 'ar'], {
            'en-US': 'en',
            'ar-EG': 'ar'
        });
        $translateProvider.preferredLanguage('ar');
        //$translateProvider.determinePreferredLanguage();

        $translateProvider.useCookieStorage();
        $translateProvider.useLocalStorage();

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
