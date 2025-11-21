"use client"

import useBlog from "@/hooks/use-blog"
import { CheckCircle2, TrendingUp, Calendar } from "lucide-react"
import { PageProps } from '@inertiajs/core';

interface PollOption {
  id: number
  text: string
  votes: number
  percentage: number
}

interface Poll {
  id: number
  title: string
  category: string | null
  totalVotes: number
  endDate: string
  options: PollOption[]
  userVoted?: number | null
  isActive: boolean
}

interface Props extends PageProps {
    polls: Poll[];
}

export default function PollsPage({ polls }: Props) {
  const { cardBg, isDarkMode } = useBlog()

  const handleVote = (pollId: number, optionId: number) => {
    // This would typically make an API call to submit the vote
    console.log(`Voted for option ${optionId} in poll ${pollId}`)
  }

  const getStatusBadge = (isActive: boolean) => {
    if (isActive) {
      return <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">Active</span>
    }
    return <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-xs font-semibold rounded-full">Closed</span>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Fan Polls</h1>
        <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Vote on your favorite artists, songs, and trending topics in African music
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Active Polls</p>
              <p className="text-2xl font-bold">{polls.filter((p) => p.isActive).length}</p>
            </div>
          </div>
        </div>

        <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Votes</p>
              <p className="text-2xl font-bold">{polls.reduce((acc, p) => acc + p.totalVotes, 0).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Calendar className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Your Votes</p>
              <p className="text-2xl font-bold">{polls.filter((p) => p.userVoted).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Polls List */}
      <div className="space-y-8">
        {polls.map((poll) => (
          <div key={poll.id} className={`${cardBg} rounded-xl p-6 md:p-8 shadow-lg`}>
            {/* Poll Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{poll.title}</h2>
                  {getStatusBadge(poll.isActive)}
                </div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {poll.category} • {poll.totalVotes.toLocaleString()} votes • Ends {poll.endDate}
                </p>
              </div>
            </div>

            {/* Poll Options */}
            <div className="space-y-4">
              {poll.options.map((option) => {
                const isVoted = poll.userVoted === option.id
                return (
                  <button
                    key={option.id}
                    onClick={() => !poll.userVoted && poll.isActive && handleVote(poll.id, option.id)}
                    disabled={!poll.isActive || !!poll.userVoted}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      poll.isActive && !poll.userVoted ? "hover:bg-purple-500/10 cursor-pointer" : "cursor-default"
                    } ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{option.text}</span>
                        {isVoted && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                      </div>
                      <span className="font-bold text-lg">{option.percentage}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}>
                      <div
                        className={`h-full transition-all duration-500 ${isVoted ? "bg-green-500" : "bg-purple-500"}`}
                        style={{ width: `${option.percentage}%` }}
                      />
                    </div>

                    <p className={`text-sm mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {option.votes.toLocaleString()} votes
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Poll Footer */}
            {poll.userVoted && (
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-sm font-semibold">
                  ✓ You voted in this poll. Thanks for participating!
                </p>
              </div>
            )}

            {!poll.isActive && (
              <div className="mt-6 p-4 bg-gray-500/10 border border-gray-500/20 rounded-lg">
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  This poll has ended. View the final results above.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
