'use_strict';

/* Questions - unique to each activity */
angular.module('app.questions_controller', [])

.controller('QuestionCtrl', function($scope, $modal){
//Controller for Questionnaire
  //Variables
  $scope.currentQuestion = 1;
  $scope.currentAnswer;
  $scope.userFeedback= '';
  $scope.submit = false;
  $scope.nextbutton = "Next Question";
  $scope.questions = [
    {
      id: '1',
      question: 'Why is perception of voiced versus voiceless stop consonants considered categorical rather than continuous?',
      options: 
      [
        { 
          option:  "A. Perception shifts gradually from one to the other as the stimulus varies.",
          id: 'A'
        },  
        { 
          option:  "B. Perception shifts abruptly from one to the other as the stimulus varies.",
          id: 'B'
        },
        { 
          option:  "C. Listeners never perceive voiced stop consonants as voiceless and never perceive voiceless stop consonants as voiced.",
          id: 'C'
        },
        { 
          option:  "D. In syllables beginning with voiced vs. voiceless stop consonants, differences in the following vowel tell listeners which consonant was heard.",
          id: 'D'
        }  
      ],
      answer: 'B',
      answers:
      {
        D: 'Incorrect. The correct answer is B. Click EXPLAIN if you want to review this topic.',
        A: 'Incorrect. The correct answer is B. Click EXPLAIN if you want to review this topic.',
        C: 'Incorrect. The correct answer is B. Click EXPLAIN if you want to review this topic.',
        B: 'Correct!'
      }
      
    },
    {
      id: 2,
      question: 'In the graph above, at which voice onset time is the phonemic boundary, approximately?',
      options:
      [
        {
          option: "A. 50 msec.",
          id: 'A'
        },
        {
          option: "B. 0 msec",
          id: 'B'
        },
        {
          option: "C. 25 msec",
          id: 'C'
        },
        {
          option: "D. 32 msec",
          id: 'D'
        },
      ],
      answer: 'D',
      answers:
      {
        B: 'Incorrect. The correct answer is D. Click EXPLAIN if you want to review this topic.',
        A: 'Incorrect. The correct answer is D. Click EXPLAIN if you want to review this topic.',
        C: 'Incorrect. The correct answer is D. Click EXPLAIN if you want to review this topic.',
        D: 'Correct!'
      },
      media: 'images/group_graph.png'
    },
    {
      id: 3,
      question: 'Why are synthesized syllables used to investigate the relationship between voice onset time and the categorical perception of stop consonants?',
      options:
      [
        {
          option: "A. The voice onset time can be precisely controlled in synthesized syllables.",
          id: 'A'
        },
        {
          option: "B. In actual spoken syllables, the voice onset time is always 0.",
          id: 'B'
        },
        {
          option: "C. In actual spoken syllables, the voice onset time has no relation to which consonant is perceived.",
          id: 'C'
        },
        {
          option: "D. Precisely controlling the vowel quality is crucial in accurate perception of voice onset time.",
          id: 'D'
        },
      ],
      answer: 'A',
      answers:
      {
        B: 'Incorrect. The correct answer is A. Click EXPLAIN if you want to review this topic.',
        D: 'Incorrect. The correct answer is A. Click EXPLAIN if you want to review this topic.',
        C: 'Incorrect. The correct answer is A. Click EXPLAIN if you want to review this topic.',
        A: 'Correct!'
      }
    },
    {
      id: 4,
      question: 'The reason a synthesized voice is used in studies of categorical perception is:',
      options:
      [
        {
          option: "A.	to create unbiased stimuli.",
          id: 'A'
        },
        {
          option: "B.	so that speech sounds can be presented that vary incrementally in voice onset time.",
          id: 'B'
        },
        {
          option: "C.	to present the observer with an unfamiliar voice, so perception will not rely on experience.",
          id: 'C'
        },
        {
          option: "D.	because categorical perception doesn’t occur for human speech.",
          id: 'D'
        },
      ],
      answer: 'B',
      answers:
      {
        A: 'Incorrect. The correct answer is B. Click EXPLAIN if you want to review this topic.',
        B: 'Correct!',
        C: 'Incorrect. The correct answer is B. Click EXPLAIN if you want to review this topic.',
        D: 'Incorrect. The correct answer is B. Click EXPLAIN if you want to review this topic.'
      }
    }

  ];
  
  //Functions
  
  //update the current answer variable
  $scope.update= function(id){
    $scope.currentAnswer = id;
  }
  
  
  //submit the answer - this is where the answer should be submitted to the LMS if required
  $scope.submitAnswer= function() {
    $scope.userFeedback = $scope.questions[$scope.currentQuestion - 1].answers[$scope.currentAnswer];
    $scope.userAnswer = $scope.currentAnswer;
    $scope.questions[$scope.currentQuestion-1].answered = true;
    $scope.currentAnswer = -1;
    $scope.set_submit(true);
    $scope.safeApply();
    $scope.open('myModalContent.html');
  }
 $scope.set_submit = function(b){
    
    $scope.submit = b;
    $scope.safeApply();
  }
  //Navigate through the 3 questions.
  $scope.questionsControl = function(target) {
    //console.log($scope.currentQuestion);
    if($scope.currentQuestion >= $scope.questions.length && target=='next')
    {
      $scope.nextPage();
    }
    else
    {
      if(target == "prev")
      {
        if($scope.currentQuestion == 1)
        {
          $scope.prevPage();
        
        }else
        {
          $scope.currentQuestion--;
          if($scope.questions[$scope.currentQuestion-1].answered )
          {
            $scope.answered = true;
          }else
          {
            $scope.answered = false;
          }
          if($scope.currentQuestion < $scope.questions.length)
          {
            $scope.nextbutton = 'Next Question';
          }
        }
         
      }
      if(target == 'next')
      {
        $scope.userAnswer = null;
        $scope.currentQuestion++;
        if($scope.questions[$scope.currentQuestion-1].answered )
        {
          $scope.answered = true;
        }else
        {
          $scope.answered = false;
        }
        if($scope.currentQuestion >= $scope.questions.length)
        {
          $scope.nextbutton = 'Next';
        }
      }
    }
    $scope.safeApply();
  }
  
  
  $scope.checkForWarning = function() {
    if(!$scope.submit && !$scope.questions[$scope.currentQuestion-1].answered)
    {
      $scope.open('questionWarning.html');
    }else
    {
      $scope.set_submit(false);
      $scope.questionsControl('next'); 
    }
  }
  //open modal
  $scope.open = function (template) {
    var modalInstance = $modal.open({
      templateUrl: template,
      controller: ModalInstanceCtrl,
      resolve: {
        userFeedback: function () {
          return $scope.userFeedback;
        }
      }
    });

    modalInstance.result.then(function () {
      
      //$scope.questionsControl('next');
    }, function () {
      //$scope.questionsControl('prev');
    });
  };
  
});
