angular.module('app').controller('mvJobSeekerCtrl', function ($scope, $routeParams, mvExperiance, mvCourse, mvIdentity,
    mvAddress, mvJobSeeker, mvEducationalInformation, mvExperianceRepo, mvNotifier,
    mvEducationalInformationRepo, mvCourseRepo , mvAddressRepo, queryBulider ,mvSkill, mvLanguageSkill,mvSkillRepo) {
    
    var id = $routeParams.id;
    var tabName = $routeParams.tab;
    $scope.activeTab = 1;
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.init0 = function () {
        if (id) {
            mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id });
        }
    };
    
    $scope.init1 = function () {
        
        $scope.paging = {
            currentPage: 1,
            maxPagesToShow: 5,
            pageSize: 3
        };
        
        $scope.getData = function () {
            if (id) {
                mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function () {
                    mvEducationalInformation.query({
                        query: queryBulider.qb("JobSeeker=='" + mvIdentity.currentJobSeeker._id + "'&&!Deleted"),
                        jobSeeker: mvIdentity.currentJobSeeker._id,
                        currentPage: $scope.paging.currentPage,
                        pageSize: $scope.paging.pageSize
                    }, (function (res) {
                        $scope.educationalInformations = res[0].collection;
                        $scope.allDataCount = res[0].allDataCount;
                    }));
                }));
            }
        };
        
        $scope.getData();
    };
    
    $scope.init2 = function () {
        if (id) {
            mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id });
        }
    };
    
    $scope.init3 = function () {
        
        $scope.paging = {
            currentPage: 1,
            maxPagesToShow: 5,
            pageSize: 3
        };
        
        $scope.getData = function () {
            if (id) {
                mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function () {
                    mvExperiance.query({
                        query: queryBulider.qb("JobSeeker=='" + mvIdentity.currentJobSeeker._id + "'&&!Deleted"),
                        jobSeeker: mvIdentity.currentJobSeeker._id,
                        currentPage: $scope.paging.currentPage,
                        pageSize: $scope.paging.pageSize
                    }, (function (res) {
                        $scope.experiances = res[0].collection;
                        $scope.allDataCount = res[0].allDataCount;
                    }));
                }));
            }
        };
        
        $scope.getData();
    };
    
    $scope.init4 = function () {
        
        $scope.paging = {
            currentPage: 1,
            maxPagesToShow: 5,
            pageSize: 3
        };
        
        $scope.getData = function () {
            if (id) {
                mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function () {
                    mvAddress.query({
                        query: queryBulider.qb("JobSeeker=='" + mvIdentity.currentJobSeeker._id + "'&&!Deleted"),
                        jobSeeker: mvIdentity.currentJobSeeker._id,
                        currentPage: $scope.paging.currentPage,
                        pageSize: $scope.paging.pageSize
                    }, (function (res) {
                        $scope.addresses = res[0].collection;
                        $scope.allDataCount = res[0].allDataCount;
                    }));
                }));
            }
        };
        
        $scope.getData();       
    };
    
    $scope.init5 = function () {
                
        $scope.paging = {
            currentPage: 1,
            maxPagesToShow: 5,
            pageSize: 3
        };
        
        $scope.getData = function () {
            if (id) {
                mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function () {
                    mvCourse.query({
                        query: queryBulider.qb("JobSeeker=='" + mvIdentity.currentJobSeeker._id + "'&&!Deleted"),
                        jobSeeker: mvIdentity.currentJobSeeker._id,
                        currentPage: $scope.paging.currentPage,
                        pageSize: $scope.paging.pageSize
                    }, (function (res) {
                        $scope.courses = res[0].collection;
                        $scope.allDataCount = res[0].allDataCount;
                    }));
                }));
            }
        };
        
        $scope.getData();
    };
    
    $scope.init6 = function () {
        
        $scope.paging = {
            currentPage: 1,
            maxPagesToShow: 5,
            pageSize: 3
        };
        
        $scope.getData = function () {
            if (id) {
                mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function () {
                    mvLanguageSkill.query({
                        query: queryBulider.qb("JobSeeker=='" + mvIdentity.currentJobSeeker._id + "'&&!Deleted"),
                        jobSeeker: mvIdentity.currentJobSeeker._id,
                        currentPage: $scope.paging.currentPage,
                        pageSize: $scope.paging.pageSize
                    }, (function (res) {
                        $scope.LanguageSkills = res[0].collection;
                        $scope.allDataCount = res[0].allDataCount;
                    }));
                }));
            }
        };
        
        $scope.getData();
    };
    
    $scope.init7 = function () {
        
        $scope.paging = {
            currentPage: 1,
            maxPagesToShow: 5,
            pageSize: 3
        };
        
        $scope.getData = function () {
            if (id) {
                mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function () {
                    mvSkill.query({
                        query: queryBulider.qb("JobSeeker=='" + mvIdentity.currentJobSeeker._id + "'&&!Deleted"),
                        jobSeeker: mvIdentity.currentJobSeeker._id,
                        currentPage: $scope.paging.currentPage,
                        pageSize: $scope.paging.pageSize
                    }, (function (res) {
                        $scope.Skills = res[0].collection;
                        $scope.allDataCount = res[0].allDataCount;
                    }));
                }));
            }
        };
        
        $scope.getData();
    };

    
    switch (tabName) {
        case 'PersonalInformation':
            $scope.activeTab = 0;
            $scope.init0();
            break;
        case 'EducationalInformation':
            $scope.activeTab = 1;
            $scope.init1();
            break;
        case 'ContactInformation':
            $scope.activeTab = 2;
            $scope.init2();
            break;
        case 'Experiances':
            $scope.activeTab = 3;
            $scope.init3();
            break;
        case 'Adresses':
            $scope.activeTab = 4;
            $scope.init4();
            break;
        case 'Courses':
            $scope.activeTab = 5;
            $scope.init5();
            break;
        case 'LanguageSkills':
            $scope.activeTab = 6;
            $scope.init6();
            break;
        case 'Skills':
            $scope.activeTab = 7;
            $scope.init7();
            break;
    }
    
    $scope.deleteSkill = function (experiance) {
        console.log('delete');
        experiance.Deleted = true;
        experiance.DeletedBy = mvIdentity.currentUser;
        mvSkillRepo.updateCurrentSkill(experiance).then(function () {
            mvNotifier.notify('Skill has been deleted!');
            $scope.experiances = mvSkill.query({ jobSeeker: mvIdentity.currentJobSeeker._id });
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
    
    $scope.deleteExperiance = function (experiance) {
        console.log('delete');
        experiance.Deleted = true;
        experiance.DeletedBy = mvIdentity.currentUser;
        mvExperianceRepo.updateCurrentExperiance(experiance).then(function () {
            mvNotifier.notify('Experiance has been deleted!');
            $scope.experiances = mvExperiance.query({ jobSeeker: mvIdentity.currentJobSeeker._id });
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
    
    $scope.deleteAdress = function (adress) {
        console.log('delete');
        adress.Deleted = true;
        adress.DeletedBy = mvIdentity.currentUser;
        mvAddressRepo.updateCurrentAddress(adress).then(function () {
            mvNotifier.notify('Address has been deleted!');
            $scope.addresses = mvAddress.query({ jobSeeker: mvIdentity.currentJobSeeker._id });
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
    
    $scope.deleteCourse = function (course) {
        console.log('delete');
        course.Deleted = true;
        course.DeletedBy = mvIdentity.currentUser;
        mvCourseRepo.updateCurrentCourse(course).then(function () {
            mvNotifier.notify('Course has been deleted!');
            $scope.courses = mvCourse.query({ jobSeeker: mvIdentity.currentJobSeeker._id });
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
    
    $scope.deleteEducationalInformation = function (educationalInformation) {
        console.log('delete');
        educationalInformation.Deleted = true;
        educationalInformation.DeletedBy = mvIdentity.currentUser;
        mvEducationalInformationRepo.updateCurrentEducationalInformation(educationalInformation).then(function () {
            mvNotifier.notify('Educational Information has been deleted!');
            $scope.educationalInformations = mvEducationalInformation.query({ jobSeeker: mvIdentity.currentJobSeeker._id });
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };

});