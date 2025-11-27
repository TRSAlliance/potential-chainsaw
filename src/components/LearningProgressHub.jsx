
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Award, 
  Flame,
  BookOpen,
  Brain,
  Rocket,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AchievementBadge = ({ achievement, isUnlocked, onClick }) => {
  const badgeVariants = {
    locked: { scale: 0.8, opacity: 0.4, rotate: 0 },
    unlocked: { scale: 1, opacity: 1, rotate: [0, 360] },
    hover: { scale: 1.1, rotate: 5 }
  };

  return (
    <motion.div
      variants={badgeVariants}
      initial="locked"
      animate={isUnlocked ? "unlocked" : "locked"}
      whileHover={isUnlocked ? "hover" : {}}
      className={`relative cursor-pointer ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      onClick={() => isUnlocked && onClick(achievement)}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
        isUnlocked 
          ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-400/30' 
          : 'bg-slate-700 border-2 border-slate-600'
      }`}>
        <achievement.icon className={`w-8 h-8 ${
          isUnlocked ? 'text-white' : 'text-slate-500'
        }`} />
      </div>
      {isUnlocked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center"
        >
          <CheckCircle className="w-3 h-3 text-slate-900" />
        </motion.div>
      )}
      <p className={`text-xs mt-1 text-center ${
        isUnlocked ? 'text-white' : 'text-slate-500'
      }`}>
        {achievement.name}
      </p>
    </motion.div>
  );
};

const SkillProgressRing = ({ skill, progress, level }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getSkillColor = () => {
    if (progress >= 80) return '#10b981';
    if (progress >= 60) return '#f59e0b';
    if (progress >= 40) return '#3b82f6';
    return '#64748b';
  };

  return (
    <div className="relative w-24 h-24">
      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#374151"
          strokeWidth="6"
          fill="none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke={getSkillColor()}
          strokeWidth="6"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <skill.icon className="w-6 h-6 text-white mb-1" />
        <span className="text-xs font-bold text-white">{progress}%</span>
      </div>
      <p className="text-xs text-center text-slate-300 mt-1">{skill.name}</p>
    </div>
  );
};

const LearningStreak = ({ streak, maxStreak }) => {
  const flames = Array.from({ length: Math.min(streak, 7) }, (_, i) => i);
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1 mb-2">
        {flames.map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Flame className={`w-4 h-4 ${
              index < streak 
                ? 'text-orange-400 fill-orange-400' 
                : 'text-slate-600'
            }`} />
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-orange-400">{streak}</p>
        <p className="text-xs text-slate-400">Day Streak</p>
        <p className="text-xs text-slate-500">Best: {maxStreak}</p>
      </div>
    </div>
  );
};

export default function LearningProgressHub({ userProgress, onModuleLaunch, onAchievementView }) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [streakAnimation, setStreakAnimation] = useState(false);

  const achievements = [
    { id: 'first_module', name: 'First Steps', icon: BookOpen, description: 'Complete your first module', unlocked: userProgress.completedModules > 0 },
    { id: 'streak_3', name: 'Momentum', icon: Flame, description: '3-day learning streak', unlocked: userProgress.streak >= 3 },
    { id: 'expert_level', name: 'Expert', icon: Brain, description: 'Reach expert level in any skill', unlocked: Object.values(userProgress.skills || {}).some(skillValue => skillValue >= 90) },
    { id: 'collaboration', name: 'Team Player', icon: Users, description: 'Complete 5 collaborative modules', unlocked: userProgress.collaborativeModules >= 5 },
    { id: 'speedrun', name: 'Velocity', icon: Zap, description: 'Complete a module in under 30 minutes', unlocked: userProgress.fastestCompletion < 30 },
    { id: 'perfectionist', name: 'Perfectionist', icon: Star, description: 'Score 100% on 3 modules', unlocked: userProgress.perfectScores >= 3 },
    { id: 'mentor', name: 'Mentor', icon: Award, description: 'Help 10 other learners', unlocked: userProgress.helpedLearners >= 10 },
    { id: 'elite', name: 'Elite', icon: Rocket, description: 'Unlock elite tier modules', unlocked: userProgress.level === 'elite' }
  ];

  const skills = [
    { id: 'orchestration', name: 'Orchestration', icon: Target, progress: userProgress.skills?.orchestration || 45 },
    { id: 'analysis', name: 'Analysis', icon: BarChart3, progress: userProgress.skills?.analysis || 67 },
    { id: 'coordination', name: 'Coordination', icon: Users, progress: userProgress.skills?.coordination || 78 },
    { id: 'strategy', name: 'Strategy', icon: Brain, progress: userProgress.skills?.strategy || 52 }
  ];

  useEffect(() => {
    if (userProgress.streak > 0) {
      setStreakAnimation(true);
      const timer = setTimeout(() => setStreakAnimation(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [userProgress.streak]);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-purple-500">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{userProgress.totalXP}</p>
            <p className="text-purple-200 text-xs">Total XP</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-600 to-green-700 border-green-500">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{userProgress.completedModules}</p>
            <p className="text-green-200 text-xs">Modules Completed</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500">
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{userProgress.level}</p>
            <p className="text-blue-200 text-xs">Current Level</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-600 to-orange-700 border-orange-500">
          <CardContent className="p-4 text-center">
            <LearningStreak 
              streak={userProgress.streak} 
              maxStreak={userProgress.maxStreak} 
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Skills Progress */}
        <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-lime-400" />
              Skill Mastery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {skills.map((skill) => (
                <SkillProgressRing
                  key={skill.id}
                  skill={skill}
                  progress={skill.progress}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                  isUnlocked={achievement.unlocked}
                  onClick={onAchievementView}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Recommendations */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userProgress.recentActivity?.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-lime-500/20 flex items-center justify-center">
                    <activity.icon className="w-4 h-4 text-lime-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{activity.title}</p>
                    <p className="text-slate-400 text-xs">{activity.time}</p>
                  </div>
                  <Badge className="bg-lime-500/20 text-lime-300 text-xs">
                    +{activity.xp} XP
                  </Badge>
                </div>
              )) || (
                <p className="text-slate-400 text-center py-4">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span className="text-white font-medium text-sm">Advanced Orchestration</span>
                </div>
                <p className="text-slate-300 text-xs mb-2">
                  Ready for the next challenge in multi-agent coordination
                </p>
                <Button 
                  size="sm" 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => onModuleLaunch('advanced_orchestration')}
                >
                  Start Module
                </Button>
              </div>
              
              <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium text-sm">Team Collaboration</span>
                </div>
                <p className="text-slate-300 text-xs mb-2">
                  Join a collaborative learning session with peers
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-500 text-blue-400 hover:bg-blue-500/20"
                >
                  Join Session
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
