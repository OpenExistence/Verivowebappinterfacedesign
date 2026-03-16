import { 
  LayoutDashboard, 
  Vote, 
  Users, 
  Shield, 
  Settings, 
  Plus, 
  Eye, 
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  BarChart3,
  Home,
  LogOut
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const elections = [
    {
      id: 1,
      name: "Élection du Bureau Fédéral 2026",
      status: "active",
      voters: 145,
      participated: 98,
      startDate: "2026-03-10",
      endDate: "2026-03-20",
    },
    {
      id: 2,
      name: "Conseil d'Administration - Section Basket",
      status: "upcoming",
      voters: 78,
      participated: 0,
      startDate: "2026-03-25",
      endDate: "2026-04-05",
    },
    {
      id: 3,
      name: "Élection Comité Régional Île-de-France",
      status: "completed",
      voters: 203,
      participated: 187,
      startDate: "2026-02-15",
      endDate: "2026-02-28",
    },
  ];

  const stats = [
    {
      label: "Scrutins actifs",
      value: "1",
      icon: Vote,
      change: "+0",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Votants inscrits",
      value: "426",
      icon: Users,
      change: "+145",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Taux de participation",
      value: "67.6%",
      icon: TrendingUp,
      change: "+12.3%",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Preuves validées",
      value: "285",
      icon: Shield,
      change: "+98",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const recentActivity = [
    {
      type: "vote",
      message: "Nouveau vote enregistré - Élection Bureau Fédéral",
      time: "Il y a 5 minutes",
      hash: "0x7a9f...3c2d",
    },
    {
      type: "verification",
      message: "Preuve blockchain validée avec succès",
      time: "Il y a 12 minutes",
      hash: "0x4b1e...8f9a",
    },
    {
      type: "voter",
      message: "15 nouveaux votants ajoutés - Section Basket",
      time: "Il y a 1 heure",
      hash: null,
    },
    {
      type: "election",
      message: "Scrutin Comité Régional clôturé",
      time: "Il y a 2 heures",
      hash: "0x9c3a...7d2b",
    },
  ];

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
    { id: "elections", icon: Vote, label: "Scrutins" },
    { id: "voters", icon: Users, label: "Liste des votants" },
    { id: "blockchain", icon: Shield, label: "Preuves blockchain" },
    { id: "settings", icon: Settings, label: "Paramètres" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Verivo</div>
              <div className="text-xs text-gray-500">Admin Dashboard</div>
            </div>
          </div>
          {user && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Connecté en tant que</p>
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-600">{user.email}</p>
            </div>
          )}
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    activeMenu === item.id
                      ? "bg-blue-50 text-blue-900"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <Button 
            variant="outline" 
            className="w-full gap-2 mb-2"
            onClick={() => navigate("/")}
          >
            <Home className="w-4 h-4" />
            Retour à l'accueil
          </Button>
          <Button 
            variant="ghost" 
            className="w-full gap-2"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="text-sm text-gray-500">Gestion et suivi de vos scrutins</p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => navigate("/transparency/1")}
              >
                <Eye className="w-4 h-4" />
                Voir la transparence
              </Button>
              <Button 
                className="gap-2"
                onClick={() => navigate("/admin/create-election")}
              >
                <Plus className="w-4 h-4" />
                Créer un scrutin
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Scrutins actifs */}
            <Card className="lg:col-span-2 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Scrutins en cours</h2>
                <Button variant="ghost" size="sm" onClick={() => setActiveMenu("elections")}>
                  Voir tout
                </Button>
              </div>
              <div className="space-y-4">
                {elections.map((election) => (
                  <div 
                    key={election.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/results/${election.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{election.name}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(election.startDate).toLocaleDateString("fr-FR")} - {new Date(election.endDate).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      <Badge 
                        variant={
                          election.status === "active" 
                            ? "default" 
                            : election.status === "completed"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {election.status === "active" && <><Clock className="w-3 h-3 mr-1" />En cours</>}
                        {election.status === "completed" && <><CheckCircle className="w-3 h-3 mr-1" />Terminé</>}
                        {election.status === "upcoming" && <><AlertCircle className="w-3 h-3 mr-1" />À venir</>}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Participation</span>
                        <span className="font-medium text-gray-900">
                          {election.participated} / {election.voters} ({Math.round((election.participated / election.voters) * 100)}%)
                        </span>
                      </div>
                      <Progress value={(election.participated / election.voters) * 100} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Widgets */}
            <div className="space-y-6">
              {/* Vérification blockchain */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Statut blockchain</h3>
                    <p className="text-xs text-gray-500">Dernière synchro: maintenant</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Smart contracts</span>
                    <Badge variant="secondary" className="bg-green-50 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Actifs
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Preuves ZKP</span>
                    <Badge variant="secondary" className="bg-green-50 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Validées
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Réseau</span>
                    <Badge variant="secondary" className="bg-green-50 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Opérationnel
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Actions rapides */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Actions rapides</h3>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => navigate("/admin/create-election")}
                  >
                    <Plus className="w-4 h-4" />
                    Nouveau scrutin
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => setActiveMenu("voters")}
                  >
                    <Users className="w-4 h-4" />
                    Importer des votants
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => navigate("/transparency/1")}
                  >
                    <BarChart3 className="w-4 h-4" />
                    Voir les résultats
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Activité récente */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === "vote" ? "bg-blue-100" :
                    activity.type === "verification" ? "bg-green-100" :
                    activity.type === "voter" ? "bg-purple-100" :
                    "bg-orange-100"
                  }`}>
                    {activity.type === "vote" && <Vote className="w-5 h-5 text-blue-600" />}
                    {activity.type === "verification" && <Shield className="w-5 h-5 text-green-600" />}
                    {activity.type === "voter" && <Users className="w-5 h-5 text-purple-600" />}
                    {activity.type === "election" && <FileText className="w-5 h-5 text-orange-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      {activity.hash && (
                        <>
                          <span className="text-xs text-gray-300">•</span>
                          <code className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {activity.hash}
                          </code>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}